'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.createTable('users', { id: Sequelize.INTEGER });
    */
    return queryInterface.createTable('tokens', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.DataTypes.INTEGER,
      },
      user_id: {
        allowNull: true,
        type: Sequelize.DataTypes.INTEGER,
      },
      token: {
        allowNull: true,
        type: Sequelize.DataTypes.STRING,
      },
      type: {
        allowNull: true,
        type: Sequelize.DataTypes.STRING,
      },
      is_revoked: {
        allowNull: true,
        type: Sequelize.DataTypes.BOOLEAN,
        default: false,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DataTypes.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DataTypes.DATE,
      },
    });

    //  table.integer('user_id').unsigned().references('id').inTable('users')
    //  table.string('token', 1500).notNullable().unique().index()
    //  table.string('type', 80).notNullable()
    //  table.boolean('is_revoked').defaultTo(false)
  },

  down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.dropTable('users');
    */
    return queryInterface.dropTable('tokens');
  }
};
