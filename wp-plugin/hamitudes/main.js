
const ENS_ADDRESS = '0x00000000000C2E074eC69A0dFb2997BA6C7d2e1e'

const ENS_ABI = [
  {
    "constant": true,
    "inputs": [
      {
        "name": "node",
        "type": "bytes32"  
      }
    ], 
    "name": "resolver",
    "outputs": [
      {
        "name": "",
        "type": "address"
      }
    ],
    "payable": false, 
    "type": "function"
  }
]
const resolverABI = [
  {
    "constant": true,
    "inputs": [
      {
        "internalType": "bytes32",
        "name": "node", 
        "type": "bytes32"
      }
    ],
    "name": "addr",
    "outputs": [
      {
        "internalType": "address payable",
        "name": "",
        "type": "address"
      }
    ],
    "payable": false,
    "stateMutability": "view",
    "type": "function"
  }
]


function quickGuide() {
  alert("hello, this is my quick-guide custom js");
}

let msg = "";

function makeCircles() {
  var svg = d3.select("#dataviz_area");
  svg.append("circle")
    .attr("cx", 2).attr("cy", 2).attr("r", 40).style("fill", "blue");
  svg.append("circle")
    .attr("cx", 140).attr("cy", 70).attr("r", 40).style("fill", "red");
  svg.append("circle")
    .attr("cx", 300).attr("cy", 100).attr("r", 40).style("fill", "green");
  svg.append("text")
    .text(msg)
    .attr("x", 20)
    .attr("y", 20);
  alert("quick-guide.js: makeCircles()");
}


$(document).ready(function() {
  $('#sheetsForm').submit(function(event) {
    alert("quick-guide.js: sheetsForm submit");
    event.preventDefault(); // Prevent form submission

    var sheetsUrl = $('#sheetsUrl').val();

    // Extract the Google Sheets document ID from the URL
    var docId = extractDocId(sheetsUrl);
    console.log(docId);
    // API request URL to get the data from the Google Sheets
    var apiUrl = 'https://docs.google.com/spreadsheets/d/' + docId + '/gviz/tq?tqx=out:json';
    console.log(apiUrl);
    // Send a GET request to the API URL
    $.get(apiUrl, function(response) {
      // Parse the response and extract the data
      var data = parseGoogleSheetsResponse(response);

      // Do something with the data
      console.log(data);
    });
  });

  function extractDocId(url) {
    var regex = /\/spreadsheets\/d\/([a-zA-Z0-9-_]+)/;
    var match = regex.exec(url);
    if (match && match[1]) {
      return match[1];
    } else {
      console.error('Invalid Google Sheets URL');
    }
  }

  function parseGoogleSheetsResponse(response) {
    var json = JSON.parse(response.substr(47).slice(0, -2));
    var data = [];
    var rows = json.table.rows;
    for (var i = 0; i < rows.length; i++) {
      var row = rows[i].c;
      var rowData = [];
      for (var j = 0; j < row.length; j++) {
        var value = "";
        if (row[j]!=null) {
          value = row[j].v;
          if (msg=="") { msg = value; };
        }
        rowData.push(value);
      }
      data.push(rowData);
    }
    return data;
  }
});

// async function getAddress(name) {
//   const web3 = new Web3('https://rpc.ankr.com/eth');
//   console.log(web3);
//   console.log(ENS_ABI);
//   const ens = new web3.eth.Contract(ENS_ABI, ENS_ADDRESS);
//   console.log(ens);
//   var node = web3.utils.keccak256(name);
//   console.log(node);
//   var resolver = await ens.methods.resolver(node).call();
//   console.log("this is the resolver", resolver);
//   var address = await resolver.methods.addr(node);
//   console.log(`${name} resolves to ${address}`);
//   alert(`${name} resolves to ${address}`);
// }

async function getAddress(name) {
  const buddies = [
    "0x9E7a7e8e0B7D8C8D9C5e8dBb7c7Eb9e8C5C7D8C",
    "0x9E7a7e8e0B7D8C8D9C5e8dBb7c7Eb9e8C5C7D8C",
    "0x9E7a7e8e0B7D8C8D9C5e8dBb7c7Eb9e8C5C7D8C"
  ];
  const stake = 300; // 10 currency units a day
  const duration = 30; // 30 days to build a habit
  const deadline = "0900"; // 9am
  const createReceipt = await createHabitContract(buddies, stake, duration, deadline);
  console.log(createReceipt);
}

import hamitudesABI from "./Hamitudes.abi.json";

async function getHamitudes() {
  const web3 = new Web3('https://rpc.ankr.com/eth');
  let hamitudes = new web3.eth.Contract(hamitudesABI, "0x9E7a7e8e0B7D8C8D9C5e8dBb7c7Eb9e8C5C7D8C");
  hamitudes = await hamitudes.methods.getHamitudes().call();
  console.log(hamitudes.address);
  return hamitudes;
}

// create a habit contract
// buddies - array of addresses
// stake - stake amount per day per person
// duration - duration of the habit in days
// deadline - time of day to check in (e.g. 0900 for 9am)
async function createHabitContract(buddies, stake, duration, deadline) {
  const hamitudes = await getHamitudes();
  return hamitudes.methods.createHabitContract(buddies, stake, duration, deadline);
}

// sign a habit contract
async function signHabitContract(habitId) {
  // TODO
}

// upload a photo proof
async function proveOrBluff(habitId) {
  // TODO
}

// challenge someone's proof
async function challengBuddy(habitId, buddy) {
  // TODO
}

// resolve a contract
async function resolveHabit(habitId) {
  // TODO
}
