//Metamask sending trasactions:
//https://docs.metamask.io/guide/sending-transactions.html#transaction-parameters

detectMetamaskInstalled() //When the page is opened check for error handling issues.

let accounts = []; ////Empty array to be filled once Metamask is called.
document.getElementById("enableEthereumButton").innerHTML =  "Connect Metamask 🦊"
document.getElementById("getBookName1").innerHTML =  "Loading..."
document.getElementById("getBookName2").innerHTML =  "Loading..."
document.getElementById("getBookName3").innerHTML =  "Loading..."
document.getElementById("getBookName4").innerHTML =  "Loading..."
document.getElementById("getBookName5").innerHTML =  "Loading..."
document.getElementById("getBookAuthor1").innerHTML =  "Loading..."
document.getElementById("getBookAuthor2").innerHTML =  "Loading..."
document.getElementById("getBookAuthor3").innerHTML =  "Loading..."
document.getElementById("getBookAuthor4").innerHTML =  "Loading..."
document.getElementById("getBookAuthor5").innerHTML =  "Loading..."
// document.getElementById("getBookImageUrlLink1").innerHTML =  "Loading..."
// document.getElementById("getBookImageUrlLink2").innerHTML =  "Loading..."
// document.getElementById("getBookImageUrlLink3").innerHTML =  "Loading..."
// document.getElementById("getBookImageUrlLink4").innerHTML =  "Loading..."
// document.getElementById("getBookImageUrlLink5").innerHTML =  "Loading..."

const scrollSepoliaChainId = 534351;

const provider = new ethers.providers.Web3Provider(window.ethereum); //Imported ethers from index.html with "<script src="https://cdn.ethers.io/lib/ethers-5.6.umd.min.js" type="text/javascript"></script>".

// const signer = provider.getSigner(); //Do this when the user clicks "enableEthereumButton" which will call getAccount() to get the signer private key for the provider.  
 
const contractAddress_JS = '0x7BBB7716B346874e31fA40F1c959868720f25fD2'
const contractABI_JS = [{"inputs":[],"stateMutability":"nonpayable","type":"constructor"},{"inputs":[],"name":"FiveBooksOnShelfAlready","type":"error"},{"inputs":[],"name":"NotEnoughLinkForTwoRequests","type":"error"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"bytes32","name":"id","type":"bytes32"}],"name":"ChainlinkCancelled","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"bytes32","name":"id","type":"bytes32"}],"name":"ChainlinkFulfilled","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"bytes32","name":"id","type":"bytes32"}],"name":"ChainlinkRequested","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"bytes32","name":"requestId","type":"bytes32"},{"indexed":true,"internalType":"string","name":"stringValue","type":"string"}],"name":"RequestStringFulfilled","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"string","name":"requestUrl","type":"string"}],"name":"newStringUrlRequest","type":"event"},{"inputs":[],"name":"ORACLE_PAYMENT","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"","type":"uint256"}],"name":"bookAuthor","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"","type":"uint256"}],"name":"bookImageLinkUrl","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"","type":"uint256"}],"name":"bookIndexIsbn","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"","type":"uint256"}],"name":"bookName","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"bookShelfIndex","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"bytes32","name":"","type":"bytes32"}],"name":"chainlinkRequestBookIndexAuthor","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"bytes32","name":"","type":"bytes32"}],"name":"chainlinkRequestBookIndexImageLinkUrl","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"bytes32","name":"","type":"bytes32"}],"name":"chainlinkRequestBookIndexName","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"bytes32","name":"_requestId","type":"bytes32"},{"internalType":"string","name":"_stringReturned","type":"string"}],"name":"fulfillBookAuthor","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"bytes32","name":"_requestId","type":"bytes32"},{"internalType":"string","name":"_stringReturned","type":"string"}],"name":"fulfillBookImageLinkUrl","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"bytes32","name":"_requestId","type":"bytes32"},{"internalType":"string","name":"_stringReturned","type":"string"}],"name":"fulfillBookName","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"string","name":"isbnValue","type":"string"}],"name":"getMultipleChainlinkRequests","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"urlRebuiltJSON","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"}]
const contractDefined_JS = new ethers.Contract(contractAddress_JS, contractABI_JS, provider);

// const contractDefined_JS = new ethers.Contract(contractAddress_JS, contractABI_JS, signer);


getDataOnChainToLoad()

async function getDataOnChainToLoad(){
  let chainIdConnected = await getChainIdConnected();

  if(chainIdConnected == scrollSepoliaChainId){
    getStoredData()
  }
  if(chainIdConnected != scrollSepoliaChainId){
    document.getElementById("getBookName1").innerHTML =  "Install Metamask and select Scroll Sepolia Testnet to have a Web3 provider to read blockchain data."
    document.getElementById("getBookName2").innerHTML =  "Install Metamask and select Scroll Sepolia Testnet to have a Web3 provider to read blockchain data."
    document.getElementById("getBookName3").innerHTML =  "Install Metamask and select Scroll Sepolia Testnet to have a Web3 provider to read blockchain data."
    document.getElementById("getBookName4").innerHTML =  "Install Metamask and select Scroll Sepolia Testnet to have a Web3 provider to read blockchain data."
    document.getElementById("getBookName5").innerHTML =  "Install Metamask and select Scroll Sepolia Testnet to have a Web3 provider to read blockchain data."
    document.getElementById("getBookAuthor1").innerHTML =  "Install Metamask and select Scroll Sepolia Testnet to have a Web3 provider to read blockchain data."
    document.getElementById("getBookAuthor2").innerHTML =  "Install Metamask and select Scroll Sepolia Testnet to have a Web3 provider to read blockchain data."
    document.getElementById("getBookAuthor3").innerHTML =  "Install Metamask and select Scroll Sepolia Testnet to have a Web3 provider to read blockchain data."
    document.getElementById("getBookAuthor4").innerHTML =  "Install Metamask and select Scroll Sepolia Testnet to have a Web3 provider to read blockchain data."
    document.getElementById("getBookAuthor5").innerHTML =  "Install Metamask and select Scroll Sepolia Testnet to have a Web3 provider to read blockchain data."
    // document.getElementById("getBookImageUrlLink1").innerHTML =  "Install Metamask and select Scroll Sepolia Testnet to have a Web3 provider to read blockchain data."
    // document.getElementById("getBookImageUrlLink2").innerHTML =  "Install Metamask and select Scroll Sepolia Testnet to have a Web3 provider to read blockchain data."
    // document.getElementById("getBookImageUrlLink3").innerHTML =  "Install Metamask and select Scroll Sepolia Testnet to have a Web3 provider to read blockchain data."
    // document.getElementById("getBookImageUrlLink4").innerHTML =  "Install Metamask and select Scroll Sepolia Testnet to have a Web3 provider to read blockchain data."
    // document.getElementById("getBookImageUrlLink5").innerHTML =  "Install Metamask and select Scroll Sepolia Testnet to have a Web3 provider to read blockchain data."
  }

}

async function getStoredData() {
  let bookNameValue1 = await contractDefined_JS.bookName(0)
  let bookNameValue2 = await contractDefined_JS.bookName(1)
  let bookNameValue3 = await contractDefined_JS.bookName(2)
  let bookNameValue4 = await contractDefined_JS.bookName(3)
  let bookNameValue5 = await contractDefined_JS.bookName(4)
  let bookAuthorValue1 = await contractDefined_JS.bookAuthor(0)
  let bookAuthorValue2 = await contractDefined_JS.bookAuthor(1)
  let bookAuthorValue3 = await contractDefined_JS.bookAuthor(2)
  let bookAuthorValue4 = await contractDefined_JS.bookAuthor(3)
  let bookAuthorValue5 = await contractDefined_JS.bookAuthor(4)
  let bookImageUrlLinkValue1 = await contractDefined_JS.bookImageLinkUrl(0)
  let bookImageUrlLinkValue2 = await contractDefined_JS.bookImageLinkUrl(1)
  let bookImageUrlLinkValue3 = await contractDefined_JS.bookImageLinkUrl(2)
  let bookImageUrlLinkValue4 = await contractDefined_JS.bookImageLinkUrl(3)
  let bookImageUrlLinkValue5 = await contractDefined_JS.bookImageLinkUrl(4)
  if(bookNameValue1 === undefined){
    document.getElementById("getBookName1").innerHTML =  "Install Metamask and select Sepolia Testnet to have a Web3 provider to read blockchain data."
    document.getElementById("getBookName2").innerHTML =  "Install Metamask and select Sepolia Testnet to have a Web3 provider to read blockchain data."
    document.getElementById("getBookName3").innerHTML =  "Install Metamask and select Sepolia Testnet to have a Web3 provider to read blockchain data."
    document.getElementById("getBookName4").innerHTML =  "Install Metamask and select Sepolia Testnet to have a Web3 provider to read blockchain data."
    document.getElementById("getBookName5").innerHTML =  "Install Metamask and select Sepolia Testnet to have a Web3 provider to read blockchain data."
    document.getElementById("getBookAuthor1").innerHTML =  "Install Metamask and select Sepolia Testnet to have a Web3 provider to read blockchain data."
    document.getElementById("getBookAuthor2").innerHTML =  "Install Metamask and select Sepolia Testnet to have a Web3 provider to read blockchain data."
    document.getElementById("getBookAuthor3").innerHTML =  "Install Metamask and select Sepolia Testnet to have a Web3 provider to read blockchain data."
    document.getElementById("getBookAuthor4").innerHTML =  "Install Metamask and select Sepolia Testnet to have a Web3 provider to read blockchain data."
    document.getElementById("getBookAuthor5").innerHTML =  "Install Metamask and select Sepolia Testnet to have a Web3 provider to read blockchain data."
    // document.getElementById("getBookImageUrlLink1").innerHTML =  "Install Metamask and select Sepolia Testnet to have a Web3 provider to read blockchain data."
    // document.getElementById("getBookImageUrlLink2").innerHTML =  "Install Metamask and select Sepolia Testnet to have a Web3 provider to read blockchain data."
    // document.getElementById("getBookImageUrlLink3").innerHTML =  "Install Metamask and select Sepolia Testnet to have a Web3 provider to read blockchain data."
    // document.getElementById("getBookImageUrlLink4").innerHTML =  "Install Metamask and select Sepolia Testnet to have a Web3 provider to read blockchain data."
    // document.getElementById("getBookImageUrlLink5").innerHTML =  "Install Metamask and select Sepolia Testnet to have a Web3 provider to read blockchain data."
  }
  else{
    document.getElementById("getBookName1").innerHTML =  bookNameValue1
    document.getElementById("getBookName2").innerHTML =  bookNameValue2
    document.getElementById("getBookName3").innerHTML =  bookNameValue3
    document.getElementById("getBookName4").innerHTML =  bookNameValue4
    document.getElementById("getBookName5").innerHTML =  bookNameValue5
    document.getElementById("getBookAuthor1").innerHTML =  bookAuthorValue1
    document.getElementById("getBookAuthor2").innerHTML =  bookAuthorValue2
    document.getElementById("getBookAuthor3").innerHTML =  bookAuthorValue3
    document.getElementById("getBookAuthor4").innerHTML =  bookAuthorValue4
    document.getElementById("getBookAuthor5").innerHTML =  bookAuthorValue5
    console.log(bookImageUrlLinkValue1);
    console.log(bookImageUrlLinkValue2);
    console.log(bookImageUrlLinkValue3);
    console.log(bookImageUrlLinkValue4);
    console.log(bookImageUrlLinkValue5);
    // document.getElementById("getBookImageUrlLink1").innerHTML =  bookImageUrlLinkValue1
    // document.getElementById("getBookImageUrlLink2").innerHTML =  bookImageUrlLinkValue2
    // document.getElementById("getBookImageUrlLink3").innerHTML =  bookImageUrlLinkValue3
    // document.getElementById("getBookImageUrlLink4").innerHTML =  bookImageUrlLinkValue4
    // document.getElementById("getBookImageUrlLink5").innerHTML =  bookImageUrlLinkValue5
  }
}

async function sentTxAsync(x) {

  const callDataObject = await contractDefined_JS.populateTransaction.set(x);
  const txData = callDataObject.data;

  ethereum
  .request({
    method: 'eth_sendTransaction',
    params: [
      {
        from: accounts[0],
        to: contractAddress_JS,
        data: txData
      },
    ],
  })
  .then((txHash) => console.log(txHash))
  .catch((error) => console.error);  
    
}

// contractDefined_JS.on("setEvent", () => {

//   getStoredData()

// });

//Connect to Metamask.
const ethereumButton = document.querySelector('#enableEthereumButton');
ethereumButton.addEventListener('click', () => {
    detectMetamaskInstalled()
    enableMetamaskOnSepolia()
});

// // MODIFY CONTRACT STATE WITH SET FUNCTION WITH PREDEFINED DATA FROM WEB3.JS
// const changeStateInContractEvent = document.querySelector('.changeStateInContractEvent');
// changeStateInContractEvent.addEventListener('click', () => {
//   checkAddressMissingMetamask()
  
//   var inputContractText = document.getElementById("setValueSmartContract").value.toString();

//   if(/^\d+$/.test(inputContractText)==false) {
//     alert("Can only accept numeric characters.")
//     return
//   }

//   if(BigInt(inputContractText) > (BigInt(2**256)-BigInt(1)) ) {
//     alert("Value is larger than uin256 max value ((2^256)-1).")
//     return
//   }

//   sentTxAsync(inputContractText)

// })

//If Metamask is not detected the user will be told to install Metamask.
function detectMetamaskInstalled(){
  try{
     ethereum.isMetaMask
  }
  catch(missingMetamask) {
     alert("Metamask not detected in browser! Install Metamask browser extension, then refresh page!")
     document.getElementById("getBookName1").innerHTML =  "Install Metamask and select Sepolia Testnet to have a Web3 provider to read blockchain data."
     document.getElementById("getBookName2").innerHTML =  "Install Metamask and select Sepolia Testnet to have a Web3 provider to read blockchain data."
     document.getElementById("getBookName3").innerHTML =  "Install Metamask and select Sepolia Testnet to have a Web3 provider to read blockchain data."
     document.getElementById("getBookName4").innerHTML =  "Install Metamask and select Sepolia Testnet to have a Web3 provider to read blockchain data."
     document.getElementById("getBookName5").innerHTML =  "Install Metamask and select Sepolia Testnet to have a Web3 provider to read blockchain data."
  }

}

//Alert user to connect their Metamask address to the site before doing any transactions.
function checkAddressMissingMetamask() {
  if(accounts.length == 0) {
    alert("No address from Metamask found. Click the top button to connect your Metamask account then try again without refreshing the page.")
  }
}

async function getChainIdConnected() {

  const connectedNetworkObject = await provider.getNetwork();
  const chainIdConnected = connectedNetworkObject.chainId;
  return chainIdConnected

}

async function getAccount() {
  accounts = await ethereum.request({ method: 'eth_requestAccounts' });
  const signer = provider.getSigner();
  document.getElementById("enableEthereumButton").innerText = accounts[0].substr(0,5) + "..." +  accounts[0].substr(38,4)  
}

async function enableMetamaskOnSepolia() {
  //Get account details from Metamask wallet.
  getAccount();

  // Updated chainId request method suggested by Metamask.
  let chainIdConnected = await window.ethereum.request({method: 'net_version'});

  // // Outdated chainId request method which might get deprecated:
  // //  https://github.com/MetaMask/metamask-improvement-proposals/discussions/23
  // let chainIdConnected = window.ethereum.networkVersion;

  console.log("chainIdConnected: " + chainIdConnected)

  //Check if user is on the Sepolia testnet. If not, alert them to change to Sepolia.
  if(chainIdConnected != scrollSepoliaChainId){
    // alert("You are not on the Sepolia Testnet! Please switch to Sepolia and refresh page.")
    try{
      await window.ethereum.request({
          method: "wallet_switchEthereumChain",
          params: [{
             chainId: "0x" + scrollSepoliaChainId.toString(16) //Convert decimal to hex string.
          }]
        })
      location.reload(); 
      // alert("Failed to add the network at chainId " + scrollSepoliaChainId + " with wallet_addEthereumChain request. Add the network with https://chainlist.org/ or do it manually. Error log: " + error.message)
    } catch (error) {
      alert("Failed to add the network at chainId " + scrollSepoliaChainId + " with wallet_addEthereumChain request. Add the network with https://chainlist.org/ or do it manually. Error log: " + error.message)
    }
  }
}