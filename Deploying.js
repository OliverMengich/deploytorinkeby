const HDWalletProvider = require('truffle-hdwallet-provider');
const Web3 = require('web3'); // the web3 constructor


//get the interface and bytecode
const {interface,bytecode} = require('./compile');
const provider = new HDWalletProvider(
  // mnemonic of the network the contract
  'your network mnemonic',
  // link/ to the network you deploy you contract there
  'your connection to the infura account'
);
// specifies the network and the account to the network to run the contract
const web3 = new Web3(provider);

// using the async await syntax
const deploy = async() =>{
  //get the link of accounts unlicked
  const accounts = await web3.eth.getAccounts();

  console.log('Attempting to deploy from accounts',accounts[0]);

  const result = await new web3.eth.Contract(JSON.parse(interface))
       .deploy({data: bytecode, arguments:['Hi there']})
       // send transactions to the network by specifying gas and accounts
       .send({gas:'1000000',from: accounts[0]});
  console.log('Contract deployed to ',result.options.address);
};
deploy();
