const Web3 = require('web3');
const HDWalletProvider = require("truffle-hdwallet-provider");
const mnemonic = 'alley village fox never just borrow begin vault naive paddle sick dice';
const instance = {
    networks: {
        development: {
            host: "127.0.0.1",
            port: 8545,
            network_id: "*"
        },
        rinkeby: {
            provider: function () {
                return new HDWalletProvider(mnemonic, "https://rinkeby.infura.io/v3/1bcd89a31fc44cda8aa518374eacb56c");
            },
            network_id: 4,
            gas: 6700000,
            gasPrice: 10000000000,
        }
    }
}

const provider = instance.networks.rinkeby.provider();
const web3 = new Web3(provider);

module.exports = web3;
