let Buffer = require('buffer/').Buffer
console.log("Buffer: " + Buffer);

import { Client } from '@xmtp/xmtp-js'
import { Wallet } from 'ethers'



function testBundle(){
  console.log("testBundle()");
}

async function myChat(){
  console.log("myChat()");

  // You'll want to replace this with a wallet from your application
  const wallet = Wallet.createRandom()
  // Create the client with your wallet. This will connect to the XMTP development network by default
  const xmtp = await Client.create(wallet)
  // Start a conversation with XMTP
  const conversation = await xmtp.conversations.newConversation(
    '0x3F11b27F323b62B159D2642964fa27C46C841897'
  )
  // Load all messages in the conversation
  const messages = await conversation.messages()
  // Send a message
  await conversation.send('gm')
  // Listen for new messages in the conversation
  for await (const message of await conversation.streamMessages()) {
    console.log(`[${message.senderAddress}]: ${message.content}`)
  }

  console.log("myChat() done");
}
