const ChristmasTree = artifacts.require("./ChristmasTree.sol");

contract('ChristmasTree', (accounts) => {

    var account = accounts[0];

    before(async () => {
        // console.log(accounts[1]);
        console.log(account);
    });

    // it("play simply", async () => {
    //     const instance = await ChristmasTree.deployed();
    //     const abi = web3.eth.abi.encodeParameters(
    //         ['uint256', 'uint256'],
    //         [accounts[0], 0]
    //     );
    //     // console.log(abi);
    //     const key = web3.utils.sha3(abi);
    //     const beforePower = await web3.eth.getStorageAt(instance.address, key);
    //     console.log(beforePower);
    //     await instance.pray();
    //     const afterPower = await web3.eth.getStorageAt(instance.address, key);
    //     console.log(afterPower);
    // });

    // it("decorate push", async () => {
    //     const instance = await ChristmasTree.deployed();
    //     await instance.pushDecoration(web3.utils.toBN(1));
    //     await instance.pushDecoration(web3.utils.toBN(2));
    //     const abi = web3.eth.abi.encodeParameters(
    //         ['uint256', 'uint256'],
    //         [accounts[0], 1]
    //     );
    //     const key = web3.utils.sha3(abi);
    //     const decorate1 = await web3.eth.getStorageAt(instance.address, key);
    //     console.log(decorate1);
    // });

    it("decorate pop", async () => {
        const instance = await ChristmasTree.deployed();
        await instance.popDecoration({from: account});
    });

    it("replace decoration then get storage", async () => {
        const instance = await ChristmasTree.deployed();
        await instance.replaceDecoration(0, 563475685474, {from: account});
        const decorateZeroAbi = web3.eth.abi.encodeParameters(
            ['uint256', 'uint256'],
            [account, 1]
        );
        const decorateZeroKey = web3.utils.sha3(decorateZeroAbi);
        // const decorateArrayLength = await web3.eth.getStorageAt(instance.address, decorateZeroKey);
        // console.log(decorateArrayLength);       // FFFFFFFFFF...
        // console.log(decorateZeroKey);
        const someAbi = web3.eth.abi.encodeParameters(
            ['uint256'],
            [decorateZeroKey]
        );
        // console.log(someAbi);
        const someKey = web3.utils.sha3(someAbi);
        console.log(someKey);
        const someVal = await web3.eth.getStorageAt(instance.address, someKey);
        console.log(someVal);
    });

    it("decorate", async () => {
        const instance = await ChristmasTree.deployed();
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
        assert.equal(web3.utils.toHex(web3.utils.toBN(decorateKey).add(decorateTargetIndex)), powerKey);

        await instance.replaceDecoration(web3.utils.toHex(decorateTargetIndex), 100000000, {from: account});
        const amount = await instance.decorationAt(account, web3.utils.toHex(decorateTargetIndex));
        const power = await instance.powerOf(account);
        console.log(power);
        assert.equal(amount.toString(16), power.toString(16));
    });

});
