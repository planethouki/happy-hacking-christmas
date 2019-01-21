module.exports = function(callback) {
    console.log(`now: ${Math.floor(Date.now() / 1000)}`);
    web3.eth.getAccounts((e,r) => {
        console.log(r);
        callback();
    });

};