const Achievements = artifacts.require("Achievements");

module.exports = function (deployer) {
  deployer.deploy(Achievements);
};
