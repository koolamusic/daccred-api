const BadgeRouter = artifacts.require('Router');

module.exports = function (deployer) {
  deployer.deploy(BadgeRouter);
} as Truffle.Migration;

export {}