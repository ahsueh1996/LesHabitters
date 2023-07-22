// const { getHamitudes } = require("./main.js")
const abi = require('./abi.json')
var { Web3 } = require('web3');
var utf8 = require('utf8')
import { MetaMaskSDK } from '@metamask/sdk';

async function main() {


  const ethereum = MMSDK.getProvider() // You can also access via window.ethereum

  let accounts = await ethereum.request({ method: 'eth_requestAccounts' })
  setWallet(accounts);

  // console.log('abi: ', abi)

  const web3 = new Web3('https://rpc.public.zkevm-test.net');
  let hamitudes = await new web3.eth.Contract(abi, "0x3BAC08499D276b70d7E3Ab7e1bc41d6CcF5DE104");
  // console.log('hamitudes method: ', hamitudes)

  hamitudes.methods.createHabitContract(
    ['0x0fA791f086b298e0D879f16592e6184374781377'],
    30,
    3,
    web3.utils.utf8ToHex('0900'),
  ).call(res => {
    console.log(res)
  })
  // async function createHabitContract(buddies, stake, duration, deadline) {
  //   const hamitudes = await getHamitudes();
  //   return hamitudes.methods.createHabitContract(buddies, stake, duration, deadline);
  // }

  hamitudes.methods.habitCount.call().call(() => {
    console.log(result)
  })


  // const hamitudes = getHamitudes()

  // console.log('hamitudes: ', hamitudes)
}

main()
