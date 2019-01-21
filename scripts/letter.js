const HDWalletProvider = require("truffle-hdwallet-provider");
require('dotenv').config();
const fs   = require('fs');
const Web3 = require('web3');

const mnemonic = process.env.ROPSTEN_MNEMONIC;
const hsot = "https://ropsten.infura.io/v3/" + process.env.ROPSTEN_INFURA_ACCESS_TOKEN;
const provider = new HDWalletProvider(mnemonic, hsot);

const web3 = new Web3(provider);

var letterABI     = JSON.parse(fs.readFileSync('./build/contracts/Letter.json')).abi;
var letterAddress = '0xbaDE12c0bd7943A066e77f0466D529D78d2F70dB';
var letterContract = web3.eth.contract(letterABI);
var letter        = letterContract.at(letterAddress);

execute().then(() => {

}).catch((e) => {
    console.error(e);
}).finally(() => {
    process.exit(0);
});

async function execute() {
    const address = await new Promise((resolve, reject) => {
        web3.eth.getAccounts((error, result) => {
            error ? reject(error) : resolve(result[0]);
        });
    });
    console.log(address);

    // const send = await new Promise((resolve, reject) => {
    //     web3.eth.sendTransaction({to:letterAddress, from:address, value:web3.toWei("1", "wei")}, (error, result) => {
    //         error ? reject(error) : resolve(result);
    //     });
    // });
    // console.log(send);

    // const seal = await new Promise((resolve, reject) => {
    //     letter.seal({from:address}, (error, result) => {
    //         error ? reject(error) : resolve(result);
    //     });
    // });
    // console.log(seal);

    const balance = await new Promise((resolve, reject) => {
        letter.balanceOf(address, (error, result) => {
            error ? reject(error) : resolve(result);
        });
    });
    console.log(balance);

    const isSealed = await new Promise((resolve, reject) => {
        letter.isSealed(address, (error, result) => {
            error ? reject(error) : resolve(result);
        });
    });
    console.log(isSealed);

    provider.engine.stop();
}