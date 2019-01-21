const HDWalletProvider = require("truffle-hdwallet-provider");
require('dotenv').config();
const fs   = require('fs');
const Web3 = require('web3');

const mnemonic = process.env.ROPSTEN_MNEMONIC;
const hsot = "https://ropsten.infura.io/v3/" + process.env.ROPSTEN_INFURA_ACCESS_TOKEN;
const provider = new HDWalletProvider(mnemonic, hsot);

const web3 = new Web3(provider);

var santaClausTokenABI     = JSON.parse(fs.readFileSync('./build/contracts/SantaClausToken.json')).abi;
var santaClausTokenAddress = '0xA9B76b79E3254d7835401A8B43aF2FaC93A83F2D';
var santaClausToken        = new web3.eth.Contract(santaClausTokenABI, santaClausTokenAddress);

execute();

async function execute() {
    const address = await web3.eth.getAccounts();
    console.log(address);
    const account = address[0];

    const balanceOf = await santaClausToken.methods.balanceOf(account).call();
    console.log(balanceOf);

    provider.engine.stop();
}