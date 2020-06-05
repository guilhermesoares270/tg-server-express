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
    return queryInterface.bulkInsert('users',
      [
        {
          username: 'Teste',
          email: 'teste@gmail.com',
          cpf: '43850031810',
          password: '$2a$10$V8z9hc2ghk0gfTaq8QXSTeVPl7ZUXIlKCLB64X8ioBXIGfBzD9h/.',
          enterprise_id: 1,
          enterprise_cnpj: '43850031110',
          createdAt: new Date(),
          updatedAt: new Date(),
        }
      ], []);
  },

  down: (queryInterface, Sequelize) => queryInterface.bulkDelete('users', null, {})
};
