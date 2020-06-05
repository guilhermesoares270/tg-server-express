const {
    getDocument,
    docsCount,
    index,
    getEnterprise,
    create,
} = require('../app/Controllers/BlockchainController');

const prefix = '/api/v1';

const register = (app) => {
    app.get(`${prefix}/ganache/getDoc`, getDocument);
    app.get(`${prefix}/ganache/count`, docsCount);
    app.get(`${prefix}/ganache/index`, index);
    app.post(`${prefix}/ganache`, create);
    app.get(`${prefix}/ganache/enterprise`, getEnterprise);
};

// Route.get('/ganache/deploy', 'BlockchainController.ganacheDeployContract');
// Route.get('/ganache/getDoc', 'BlockchainController.getDocument');
// Route.get('/ganache/count', 'BlockchainController.docsCount');
// Route.get('/ganache/index', 'BlockchainController.index');
// Route.post('/ganache/', 'BlockchainController.create');
// Route.get('/ganache/enterprise', 'BlockchainController.getEnterprise');

module.exports = register;