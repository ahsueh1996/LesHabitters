let injectedProvider = false

if (typeof window.ethereum !== 'undefined') {
  injectedProvider = true
  console.log(window.ethereum)
}

const isMetaMask = injectedProvider ? window.ethereum.isMetaMask : false

var wallet = { accounts: [] }              
function setWallet(accounts) {
    wallet.accounts = accounts;
    console.log(wallet);
}

var signer;
function setSigner(signer) {
    signer = signer;
    console.log("signer address: ", signer.address);
}

const connectMM_web3js = async () => {                
    let accounts = await window.ethereum.request({  
        method: "eth_requestAccounts",                
    })                                              
    setWallet(accounts);
    updateMMLoginBtn();
                   
}



const connectMM_MMSDK = async () => {
    console.log("connectMM_MMSDK()");
    // code from: https://docs.metamask.io/wallet/how-to/use-sdk/javascript/pure-js/
    const MMSDK = new MetaMaskSDK.MetaMaskSDK()
    const ethereum = MMSDK.getProvider() // You can also access via window.ethereum

    let accounts = await ethereum.request({method: 'eth_requestAccounts'})
    setWallet(accounts);
    updateMMLoginBtn();
}

function updateMMLoginBtn(){
    if (wallet.accounts.length > 0) {
        console.log("Connected:", wallet.accounts[0]);
        document.getElementById("metamask_login_btn").innerHTML = wallet.accounts[0];
    } 
}


$(document).ready(function(){
    document.getElementById("metamask_btn").addEventListener("click", async () => {
        connectMM_MMSDK();
    });
});