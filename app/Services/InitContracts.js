const ContractHelper = require('../Support/ContractHelper');
const ContractInstance = require('../Support/ContractInstance');
const Wallet = require('../Services/EnterpriseWallet');
const connection = require('../connection');

const findContracts = async () => {
    const { abi } = ContractHelper.readContract().contracts['generic_contract.sol']['Docs'];

    const query = 'SELECT razao_social as rs, cnpj as cnpj, contract_address as ca FROM enterprises LIMIT 500';
    const enterprises = await connection.query(query, {
        type: connection.QueryTypes.SELECT
    });

    enterprises.forEach(x => {
        const enterpriseContract = new Wallet.eth.Contract(abi, x.ca);
        ContractInstance.addContract(enterpriseContract, x.rs, x.cnpj);
    });

    console.log(`lo: ${ContractInstance.contracts.length}`);
};

module.exports = findContracts;
