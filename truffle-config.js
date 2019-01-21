const HDWalletProvider = require("truffle-hdwallet-provider");
require('dotenv').config();
const ropsten_mnemonic = process.env.ROPSTEN_MNEMONIC;
const ropsten_accessToken = process.env.ROPSTEN_INFURA_ACCESS_TOKEN;
// const ganache_mnemonic = process.env.GANACHE_MNEMONIC;
const ganache_mnemonic = process.env.ROPSTEN_MNEMONIC;

module.exports = {
    networks: {
        ropsten: {
            provider: () => new HDWalletProvider(ropsten_mnemonic, `https://ropsten.infura.io/v3/${ropsten_accessToken}`),
            network_id: 3,
            gas: 1000000,
            gasPrice: 1000000000
        },
        development: {
            provider: () => new HDWalletProvider(ganache_mnemonic, "http://192.168.33.1:7545", 0, 10),
            network_id: "*", // Match any network id
            gas: 4000000, // Gas limit used for deploys
            gasPrice: 5000000000 // 5 gwei
        },
    },
    mocha: {
        timeout: 100000
    },
    compilers: {
        solc: {
            optimizer: {
                enabled: true,
                runs: 200
            }
        }
    }
};
