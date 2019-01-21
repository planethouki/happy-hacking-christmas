const HDWalletProvider = require("truffle-hdwallet-provider");
require('dotenv').config();
const fs   = require('fs');
const Web3 = require('web3');

const mnemonic = process.env.ROPSTEN_MNEMONIC;
const hsot = "https://ropsten.infura.io/v3/" + process.env.ROPSTEN_INFURA_ACCESS_TOKEN;
const provider = new HDWalletProvider(mnemonic, hsot);

const web3 = new Web3(provider);

var giveMeStockingABI     = JSON.parse(fs.readFileSync('./build/contracts/GiveMeStocking.json')).abi;
var giveMeStockingAddress = '0xc5F2295FF9aAbbcC899F364d72Cb751c3659D19B';
var giveMeStocking        = new web3.eth.Contract(giveMeStockingABI, giveMeStockingAddress);

var christmasStockingABI     = JSON.parse(fs.readFileSync('./build/contracts/ChristmasStocking.json')).abi;
var christmasStockingAddress = '0x408F56C4541BD00Ec836102d06F7Ee6A2A820678';
var christmasStocking        = new web3.eth.Contract(christmasStockingABI, christmasStockingAddress);

execute();

async function execute() {
    const address = await web3.eth.getAccounts();
    console.log(address);

    // const deposit = await giveMeStocking.methods.deposit().send({
    //     value: web3.utils.toWei('1', 'wei'),
    //     from: "0x606686eB267A3aC2903E87af82DB424D89E1B950"
    // });
    // console.log(deposit);

    const balance = await christmasStocking.methods.balanceOf(address[0]).call();
    console.log(balance);

    provider.engine.stop();
}