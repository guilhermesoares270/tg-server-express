const users = require('./users');
const enterprises = require('./enterprises');
const sessions = require('./sessions');
const contracts = require('./contracts');

module.exports = (app) => {
    users(app);
    enterprises(app);
    sessions(app);
    contracts(app);
    app.get('*', (req, res) => res.json({ data: [], errors: ['404'] }))
};  