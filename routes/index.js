const users = require('./users');
const enterprises = require('./enterprises');

module.exports = (app) => {
    users(app);
    enterprises(app);
};