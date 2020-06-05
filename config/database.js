require('dotenv').config();

module.exports = {
  url: process.env.DEV_DATABASE_URL,
  dialect: 'postgres',
};