// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC721/IERC721.sol";

interface IDacredFactory is IERC721 {

     /**
     * @dev Method to award certificate to a user after validation
     */
    function awardCredential(address recipient, string memory tokenURI) external returns (uint256);

}