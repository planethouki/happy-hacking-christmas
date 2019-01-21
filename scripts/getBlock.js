module.exports = async function(callback) {
    console.log(`now: ${Math.floor(Date.now() / 1000)}`);

    new Promise((resolve, reject) => {
        web3.eth.getBlockNumber((error, result) => {
            error ? reject(error) : resolve(result);
        });
    }).then((blockNumber) => {
        console.log(blockNumber);
    }).catch((e) => {
        console.error(e);
    }).finally(() => {
        callback();
    });
};