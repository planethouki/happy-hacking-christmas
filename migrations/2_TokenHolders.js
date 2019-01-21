var TokenHolders = artifacts.require("./TokenHolders.sol");
var SantaClausToken = artifacts.require("./SantaClausToken.sol");

module.exports = function(deployer, network) {
    console.log(network);
    if(network === "ropsten") {

    } else if(network === "development") {
        deployer.then(() => {
            return deployer.deploy(SantaClausToken);
        }).then(instance => {
            return deployer.deploy(TokenHolders, instance.address);
        });

    }
};
