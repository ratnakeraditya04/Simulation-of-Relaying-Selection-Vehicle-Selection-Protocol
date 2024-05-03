const TrustVerification = artifacts.require("TrustVerification");

module.exports = function(deployer) {
  deployer.deploy(TrustVerification);
};