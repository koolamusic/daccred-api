// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.0;
import '@openzeppelin/contracts/token/ERC20/ERC20.sol';

// USDT Faucet impl
// Use to enable redemption for Badge issuance
contract USDCMock is ERC20 {
  constructor() payable ERC20('Circle USDC', 'USDC') {
    _mint(msg.sender, 103550);
  }
}
