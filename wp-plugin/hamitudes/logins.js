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

const handleConnect = async () => {                
    let accounts = await window.ethereum.request({  
        method: "eth_requestAccounts",                
    })                                              
    setWallet(accounts);
    if (accounts.length > 0) {
        console.log("Connected:", accounts[0]);
        document.getElementById("metamask_login_btn").innerHTML = accounts[0];
    }                    
}