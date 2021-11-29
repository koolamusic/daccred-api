// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@chainlink/contracts/src/v0.8/ChainlinkClient.sol";
import "./impl/IDacredFactory.sol";
import "./impl/DacredFactory.sol";

contract DacredRouter is ChainlinkClient {
    using Chainlink for Chainlink.Request;
   
    /** data access obj for certificate contracts */
    struct Daccred {
        DacredFactory contractAddress;
        address deployer;
        string certificateId;
        uint createdAt;
    }
   
   /* contract variables */
    bool public pass; 
    address private oracle;
    bytes32 private jobId;
    uint256 private fee;
    mapping(address => Daccred) public credentials;
    string public _uri_ = "https://7340-102-176-94-51.ngrok.io/api";

    /* events */
    event NewContractCreated(address contractAddress, uint createdAt);


    function createContractForClient(string memory name, string memory certId ) public returns(address) {
        address deployer = msg.sender;
        uint timestamp = block.timestamp;

        /* Generate new credential NFT contract */
        DacredFactory newContract = new DacredFactory(name, certId);

        /* persist to contract store */
        credentials[address(newContract)] = Daccred(newContract, deployer, certId, timestamp);

        emit NewContractCreated(address(newContract), timestamp);
        return address(newContract);

    }




    function setRequestURI(string memory _requestURI) public {
        _uri_ = _requestURI;
    }

    /**
     * Network: Kovan
     * Oracle: 0xc57B33452b4F7BB189bB5AfaE9cc4aBa1f7a4FD8 (Chainlink Devrel   
     * Node)
     * Job ID: bc746611ebee40a3989bbe49e12a02b9
     * Fee: 0.1 LINK
     */
    constructor() {
        setPublicChainlinkToken();
        oracle = 0xc57B33452b4F7BB189bB5AfaE9cc4aBa1f7a4FD8;
        jobId = "bc746611ebee40a3989bbe49e12a02b9";
        fee = 0.1 * 10 ** 18; // (Varies by network and job)
        
    }
    
    function validateRecipient(
        // uint _certId,
        string memory _claimContractAddress
        ) public returns (bytes32 requestId) {

        Chainlink.Request memory request = buildChainlinkRequest(jobId, address(this), this.fulfill.selector);
        
        // Set the URL to perform the GET request on
        request.add("post", _uri_);
        request.add("e", _claimContractAddress);
        request.add("path", "pass");
        request.add("path", "contractAddress");
        request.add("path", "id");

        



        
        // Sends the request
        return sendChainlinkRequestTo(oracle, request, fee);
    }
    
    /**
     * Receive the response in the form of bool
     */ 
    function fulfill(bytes32 _requestId, bool _pass, address contractAddress, string memory id ) public recordChainlinkFulfillment(_requestId) {
        pass = _pass;
        if(_pass) {
            DacredFactory(contractAddress).awardCredential(msg.sender, id);
        }

        // Mint Credential for recipient
        // DacredFactory()
    }
}

