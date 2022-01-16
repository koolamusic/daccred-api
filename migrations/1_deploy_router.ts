/* eslint-disable @typescript-eslint/ban-ts-comment */
//@ts-ignore
const BadgeRouter = artifacts.require('Router');

module.exports = function (deployer) {
  deployer.deploy(BadgeRouter);
  //@ts-ignore
} as Truffle.Migration;

export {};
