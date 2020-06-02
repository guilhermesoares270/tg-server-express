'use strict'

const { users, enterprises } = require('../models');
const jsonwebtoken = require('jsonwebtoken');

const create = async (request) => {
  const { email, password } = request.body;

  const user = await users.findOne({
    where: {
      email: email,
    },
  });
  if (!user) return {};
  const enterprise = await enterprises.findOne({
    where: {
      id: user.enterprise_id,
    },
  });
  const token = await jsonwebtoken.sign({ email, password, enterprise }, password);

  return {
    token,
    enterprise_cnpj: enterprise.cnpj,
  };
};

module.exports = {
  create,
};