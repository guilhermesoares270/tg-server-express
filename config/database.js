require('dotenv').config();

// module.exports = {
//   username: 'root',
//   password: 'root',
//   database: 'crud_sequelize',
//   host: '127.0.0.1',
//   dialect: 'pg',
// }

module.exports = {
  url: process.env.DEV_DATABASE_URL,
  dialect: 'postgres',
};