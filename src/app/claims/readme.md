# Claims

Claims API Resource to handle validating and claiming of Certifications, documents or credentials.
> Workflow will be like so, user asks to claim, user chooses route to claim with [walletAddress, email]

- claim will generate certification and issue credential
- claim will push credential data to IPFS permanently
- Claim will respond to API with metadata required to sign collection to blockchain

```js
// Metadata may include information like
{
  name: 'Certification Name',
  contractAddress: '0x10abd...ContractAddressForNFT..91a0bce',
  IPFSCID: 'cid....FromWeb3Storage, may be for the image of tokenURI',
  userWalletAddress: 'May come from the frontendClient if we dont have it',
  certificateJSONMetadataURI: 'tokenURI Equivalent....either our API or IPFS',
  arweaveId: 'if applicable, we leverage Arweave for permanence'
}
```
