const HDWalletProvider = require("truffle-hdwallet-provider");
require('dotenv').config();
const fs   = require('fs');
const Web3 = require('web3');

const mnemonic = process.env.ROPSTEN_MNEMONIC;
const hsot = "https://ropsten.infura.io/v3/" + process.env.ROPSTEN_INFURA_ACCESS_TOKEN;
const provider = new HDWalletProvider(mnemonic, hsot);

const web3 = new Web3(provider);

var santaClausABI     = JSON.parse(fs.readFileSync('./build/contracts/SantaClaus.json')).abi;
var santaClausAddress = '0x05d9cbEe05e82D492ad66842fc7C0Cb363B384EA';
var santaClaus        = new web3.eth.Contract(santaClausABI, santaClausAddress);

execute();

async function execute() {
    const address = await web3.eth.getAccounts();
    console.log(address);
    const account = address[0];

    // const requestToken = await santaClaus.methods.requestToken().send({from: account});
    // console.log(requestToken);

    provider.engine.stop();
}