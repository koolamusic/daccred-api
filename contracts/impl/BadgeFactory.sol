// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import '@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol';
import '@openzeppelin/contracts/access/Ownable.sol';
import '@openzeppelin/contracts/utils/Counters.sol';

contract BadgeFactory is ERC721URIStorage, Ownable {
  using Counters for Counters.Counter;
  Counters.Counter private _tokenIds;

  event CredentialAwarded(address recipient, uint256 tokenId, string claimURI);

  constructor(string memory _name, string memory _symbol) ERC721(_name, _symbol) {}

  function awardCredential(address recipient, string memory claimURI) public returns (uint256) {
    _tokenIds.increment();

    uint256 newItemId = _tokenIds.current();
    _mint(recipient, newItemId);
    _setTokenURI(newItemId, claimURI);

    emit CredentialAwarded(msg.sender, newItemId, claimURI);
    return newItemId;
  }
}
