// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.0;
import '@openzeppelin/contracts/token/ERC20/ERC20.sol';

// USDT Faucet impl
contract TetherUSDT is ERC20 {
  constructor() payable ERC20('Tether USDT', 'USDT') {
    _mint(msg.sender, 103550);
  }
}
