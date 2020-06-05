'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkInsert('People', [{
        name: 'John Doe',
        isBetaMember: false
      }], {});
    */
    return queryInterface.bulkInsert('enterprises',
      [
        {
          razao_social: 'empresa1',
          cnpj: '43850031810',
          email: 'empresa1@gmail.com',
          password: 'empresa1',
          contract_address: '0x5dbb5c21EC4bfE09fC96674a3050bAbE9FaAc222',
          phone: null,
          cep: '12710400',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          razao_social: 'empresa2',
          cnpj: '43850031510',
          email: 'empresa2@gmail.com',
          password: 'empresa2',
          contract_address: '0xca8f5408CC16F03c718A95dD0f743993227E6D70',
          phone: null,
          cep: '12710400',
          createdAt: new Date(),
          updatedAt: new Date(),
        }
      ], {});
  },

  down: (queryInterface, Sequelize) => queryInterface.bulkDelete('enterprises', null, {})
};
