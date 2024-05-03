const Web3 = require('web3');
const TrustVerification = require('./build/contracts/TrustVerification.json');
const HDWalletProvider = require('@truffle/hdwallet-provider');

// Replace with your own mnemonic and Infura project ID
const mnemonic = 'your_mnemonic_phrase';
const infuraProjectId = 'your_infura_project_id';

// Connect to an Ethereum node using Infura
const provider = new HDWalletProvider(mnemonic, `https://mainnet.infura.io/v3/${infuraProjectId}`);
const web3 = new Web3(provider);

// Load the deployed contract
const contractAddress = 'your_deployed_contract_address';
const trustVerificationContract = new web3.eth.Contract(TrustVerification.abi, contractAddress);

// Example data to be encrypted and stored
const carData = 'Location: 123.45, 67.89, Speed: 50 km/h, Direction: North';

// Implement AES encryption here
// Example using a dummy encryption key
const encryptionKey = '0x0123456789abcdef0123456789abcdef0123456789abcdef0123456789abcdef';
const encryptedData = web3.utils.sha3(carData);

// Store the encrypted data on the blockchain
trustVerificationContract.methods.storeTrustData(encryptedData, web3.eth.accounts.wallet[0].address)
  .send({ from: web3.eth.accounts.wallet[0].address })
  .on('receipt', function(receipt) {
    console.log('Encrypted data stored on the blockchain:', receipt);
  });

// Verify and decrypt the stored data
trustVerificationContract.methods.verifyAndDecryptTrustData(encryptedData, encryptionKey)
  .call()
  .then(function(result) {
    console.log('Decrypted data:', result);
  })
  .catch(function(error) {
    console.error('Error verifying and decrypting trust data:', error);
  });