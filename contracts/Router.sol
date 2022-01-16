// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import './impl/BadgeFactory.sol';
import './impl/IBadgeFactory.sol';

contract Router {
  uint256 public __init_date__;
  /** data access obj for certificate contracts */
  struct Badge {
    BadgeFactory contractAddress;
    address deployer;
    string certificateId;
    uint256 createdAt;
  }

  mapping(address => Badge) public credentials;
  event BadgeContractDeployed(address contractAddress, uint256 createdAt);

  constructor() {
    __init_date__ = block.timestamp;
  }

  function createContractForClient(string memory name, string memory certId) public returns (address) {
    address deployer = msg.sender;
    uint256 timestamp = block.timestamp;

    /* Generate new credential NFT contract */
    BadgeFactory newContract = new BadgeFactory(name, certId);

    /* persist to contract store */
    credentials[address(newContract)] = Badge(newContract, deployer, certId, timestamp);

    emit BadgeContractDeployed(address(newContract), timestamp);
    return address(newContract);
  }
}
