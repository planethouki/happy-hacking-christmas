const HDWalletProvider = require("truffle-hdwallet-provider");
require('dotenv').config();
const fs   = require('fs');
const Web3 = require('web3');

const mnemonic = process.env.ROPSTEN_MNEMONIC;
const hsot = "https://ropsten.infura.io/v3/" + process.env.ROPSTEN_INFURA_ACCESS_TOKEN;
const provider = new HDWalletProvider(mnemonic, hsot);

const web3 = new Web3(provider);

var tokenHoldersABI     = JSON.parse(fs.readFileSync('./build/contracts/TokenHolders.json')).abi;
var tokenHoldersAddress = '0x5a8B024F544Ed745Afc4d980E403c5E0967E62dF';
var tokenHolders        = new web3.eth.Contract(tokenHoldersABI, tokenHoldersAddress);

execute();

async function execute() {
    const address = await web3.eth.getAccounts();
    console.log(address);
    const account = address[0];

    const registerName = await tokenHolders.methods.registerName('planethouki').send({from: account});
    console.log(registerName);

    const holders = await tokenHolders.methods.getNames().call();
    console.log(holders);

    provider.engine.stop();
}