const TokenHolders = artifacts.require("./TokenHolders.sol");

contract('ChristmasTree', (accounts) => {

    var account = accounts[0];

    before(async () => {
        // console.log(accounts[1]);
        console.log(account);
    });


    it("registerName", async () => {
        const instance = await TokenHolders.deployed();
        await instance.registerName('namae');
        const names = await instance.getNames();
        console.log(names);
    });
});
