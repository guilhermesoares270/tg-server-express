'use strict'

const { users, enterprises } = require('../models');
const connection = require('../connection');

const create = async (userData) => {
  try {
    const enterprise = await enterprises.findOne({
      where: {
        razao_social: userData.razao_social,
      },
    });
    if (enterprise == null) throw Error('Enterprise not found');

    const newData = {
      username: userData.username,
      email: userData.email,
      cpf: userData.cpf,
      password: userData.password,
      enterprise_id: enterprise ? enterprise.id : null,
      enterprise_cnpj: enterprise ? enterprise.cnpj : null,
    }

    const newUser = await users.create(newData);

    return {
      data: Object.assign(newUser, { enterprise_razao_social: enterprise ? enterprise.razao_social : null }),
      errors: []
    };
  } catch (error) {
    return {
      data: null,
      errors: [error.message],
    };
  }
}

const alter = async (userData, { id }) => {
  try {
    console.log(`userData: ${JSON.stringify(userData)} - id: ${JSON.stringify(id)}`);
    const user = await users.update({
      username: userData.username,
      email: userData.email,
      password: userData.password,
    }, {
      where: {
        id: id
      }
    });
    return user;
  } catch (error) {
    return {
      data: null,
      errors: [error.message],
    };
  }
};

const get = async ({ id }) => {
  try {
    console.log(`id: ${id}`);
    return users.findOne({
      where: {
        id: id,
      },
    });
  } catch (error) {
    return {};
  }
}

const getByCpf = async ({ cpf }) => {
  try {
    return users.findOne({
      where: {
        cpf: cpf,
      }
    });
  } catch (err) {
    return {};
  }
}

const index = async () => await users.findAll();

module.exports = {
  create,
  alter,
  get,
  getByCpf,
  index,
};