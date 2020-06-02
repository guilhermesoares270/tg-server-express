'use strict'

const { enterprises } = require('../models');
const { deploy } = require('../Controllers/BlockchainController');

const create = async (enterpriseData) => {
  try {
    const enterprise = await enterprises.create(enterpriseData);
    await deploy(enterpriseData.razao_social, enterpriseData.cnpj);

    return enterprise;
  } catch (error) {
    // console.log(`enterprise create: ${error}`);
    // return null;
    throw error;
  }
}

module.exports = {
  create
};





// class EnterpriseController {
//   async create({ request }) {
//     try {
//       const data = request.only(["razao_social", "cnpj", "email", "password", "cep"]);

//       const enterprise = await Enterprise.create(data);
//       const blockchainController = new BlockchainController();
//       await blockchainController.deploy(data.razao_social, data.cnpj);

//       return enterprise;
//     } catch (error) {
//       return null;
//     }
//   }

//   async alter({ request, params }) {
//     const { id } = params;
//     const data = request.only(["razao_social", "cnpj", "email", "password", "cep"]);

//     const enterprise = await Enterprise.findBy(
//       "id", id
//     );

//     const { ...newData } = data;
//     enterprise.merge(newData);

//     await enterprise.save();

//     return enterprise;
//   }

//   async delete({ params }) {
//     const enterprise = await Enterprise.findBy(
//       "id", params.id
//     );
//     if (!enterprise) return {};

//     return enterprise.delete();
//   }

//   async get({ params }) {
//     return await Enterprise.findBy(
//       "cnpj", params.cnpj
//     );
//   }

//   async index() {
//     return await Enterprise.all();
//   }
// }

// module.exports = EnterpriseController
