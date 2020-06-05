'use strict'

const ContractHelper = require('../Support/ContractHelper');
const Wallet = require('../Services/EnterpriseWallet');
const ContractInstance = require('../Support/ContractInstance');

const jwtDecode = require('jwt-decode');
const { enterprises } = require('../models');

const { getByCpf } = require('./UserController');

const validateToken = (req) => {
  if (!req.headers.authorization) return false;
  return true;
};

const getToken = async (req) => {
  try {
    const exists = await validateToken(req);
    if (!exists) return {};
    const authorization = req.headers.authorization;
    if (!authorization) return {};
    const token = authorization.split(" ")[1];
    const payload = jwtDecode(token);
    return payload;
  } catch (error) {
    return {};
  }
};

const deploy = async (razao_social, cnpj) => {
  const { abi, evm } = ContractHelper.readContract().contracts['generic_contract.sol']['Docs'];
  const contract = new Wallet.eth.Contract(abi);

  const deployData = {
    abi,
    evm,
    contract,
    razao_social,
    cnpj
  };

  const [address, errors] = await deployContract(deployData);
  return {
    address,
    errors
  };
};

const ganacheDeployContract = async (req, res) => { //
  const { razao_social, cnpj } = request.body;
  res.json(await deploy(razao_social, cnpj));
};

const deployContract = async ({ contract, abi, evm, razao_social, cnpj }) => {
  try {
    const accounts = await Wallet.eth.getAccounts();

    console.log(`Attempting to deploy from account`, accounts[0]);
    const result = await contract.deploy({
      data: '0x' + evm.bytecode.object,
      arguments: [cnpj, razao_social]
    })
      .send({
        gas: 3000000,
        from: accounts[0],
        gasLimit: "3000000",
      });

    console.log(`res: ${JSON.stringify(result.options)}`);
    console.log(`Contract deployed to`, result.options.address);

    await enterprises.update(
      {
        contract_address: result.options.address,
      }, {
      where: {
        cnpj: cnpj
      }
    });

    return [result.options.address, []]
  } catch (error) {
    console.log(error.message);
    return [null, [error.message]]
  }
};

const docsCount = async (request, response) => {
  const token = await getToken(request);
  const { enterprise } = token;
  if (Object.keys(token).length === 0) return { size: 0 };

  try {
    const contractInfo = ContractInstance.contract(enterprise.razao_social);

    response.json({
      size: parseInt(await contractInfo.contract.methods.getDocsCount().call())
    });

  } catch (error) {
    console.log(`error: ${error.message}`);
    response.json({
      size: 0,
    });
  }
};

const getEnterprise = async (request, response) => {
  try {
    const token = await getToken(request);
    const { enterprise } = token;

    const contractInfo = ContractInstance.contract(enterprise.razao_social);
    if (!contractInfo) {
      response.json({ data: [], errors: ['Empresa não encontrada'] });
    }
    const data = await contractInfo.contract.methods.getEnterpriseInfo().call();
    response.json({
      ...data,
      errors: [],
    });
  } catch (error) {
    response.json({
      razao_social: null,
      cnpj: null,
      errors: [error.message]
    });
  }
};

const index = async (request, response) => {
  const token = await getToken(request);
  const { enterprise } = token;

  try {
    const contractInfo = ContractInstance.contract(enterprise.razao_social);

    if (contractInfo == null) throw Error('Contract for this enterprise not found');

    const res = await contractInfo.contract.methods.listDocuments().call();
    const signatures = res[0];
    const cpfs = res[1];

    let merge = [];
    for (let i = 0; i < res[0].length; i++) {
      const cpf = Wallet.utils.hexToUtf8(cpfs[i]);
      const userData = await getByCpf({ cpf });
      merge.push({
        email: userData?.email || '',
        signature: signatures[i],
        cpf: userData?.cpf || '',
      });
    }

    return response.json({ data: [...merge], errors: [] });
  } catch (error) {
    return response.json({ data: [], errors: error.message });
  }
};

const create = async (request, response) => {
  const token = await getToken(request);
  const { enterprise } = token;

  try {
    const { signature, cpf } = request.body;

    const addresses = await Wallet.eth.getAccounts();
    const contractInfo = ContractInstance.contract(enterprise.razao_social);

    await contractInfo.contract.methods.addDocument(
      Wallet.utils.fromUtf8(signature),
      Wallet.utils.fromUtf8(cpf)
    ).send({ from: addresses[0] }); //Change

    response.json({
      data: {
        message: 'Document added successfully',
        signature: Wallet.utils.fromUtf8(signature),
        cpf: Wallet.utils.fromUtf8(cpf)
      },
      errors: []
    });
  } catch (error) {
    return response.json({ data: [], errors: [error.message] });
  }
};

const getDocument = async (request, response) => {
  const token = await getToken(request);
  const { enterprise } = token;

  try {
    const { signature } = request.body;
    const contractInfo = ContractInstance.contract(enterprise.razao_social);

    const cpfBytes = await contractInfo.contract.methods.getDocument(
      Wallet.utils.fromUtf8(signature)
    ).call();

    if (!cpfBytes || Wallet.utils.hexToUtf8(cpfBytes) == '')
      throw Error('Documento não encontrado');

    console.log(`cpfBytes: ${cpfBytes}`);

    response.json({ data: [{ cpf: Wallet.utils.hexToUtf8(cpfBytes) }], errors: [] });
  } catch (error) {
    response.json({ data: [], errors: [error.message] });
  }
};

module.exports = {
  ganacheDeployContract,
  docsCount,
  getEnterprise,
  index,
  create,
  getDocument,
  deploy,
};