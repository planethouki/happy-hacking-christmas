const GiveMeStocking = artifacts.require("./GiveMeStocking.sol");

contract('GiveMeStocking', () => {

    before(async () => {

    });

    it("abiEncodePacked", async () => {
        const instance = await GiveMeStocking.deployed();
        const hoge = await instance.methods["abiEncodePacked()"].call();
        console.log(hoge);
    });

    it("abiEncodeWithSignature", async () => {
        const instance = await GiveMeStocking.deployed();
        const hoge = await instance.methods["abiEncodeWithSignature()"].call();
        console.log(hoge);
    });

    it("abiEncodeWithSignatureArgs", async () => {
        const instance = await GiveMeStocking.deployed();
        const hoge = await instance.methods["abiEncodeWithSignatureArgs()"].call();
        console.log(hoge);
    });

    it("deposit", async () => {
        const instance = await GiveMeStocking.deployed();
        await instance.methods["deposit()"].sendTransaction({value: web3.utils.toWei('1', 'ether')});
    });

    it("balanceOf", async () => {
        const instance = await GiveMeStocking.deployed();
        const hoge = await instance.methods["balanceOf()"].call();
        console.log(hoge.toString());
    });
});
