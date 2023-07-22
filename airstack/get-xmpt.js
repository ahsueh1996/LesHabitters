const { ApolloClient, InMemoryCache, gql } = require('apollo-boost');

const client = new ApolloClient({
  uri: 'https://api.airstack.xyz/graphql',
  cache: new InMemoryCache()
});

const GET_XMTP_INFO = gql`
  query GetXMTPInfo($address: String!) {
    xMTP(id: $address) {
      address
      transactions {
        timestamp
        blockNumber
      }
    }
  } 
`;

async function getXMTPInfo(address) {
  const { data } = await client.query({
    query: GET_XMTP_INFO,
    variables: { address }
  });
  
  return data.xMTP;
}

module.exports = { getXMTPInfo };

// Usage:
const { getXMTPInfo } = require('./xMTP');

getXMTPInfo('0x123...789').then(xMTPInfo => {
  console.log(xMTPInfo); 
});