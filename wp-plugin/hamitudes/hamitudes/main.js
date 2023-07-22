
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

// import hamitudesABI from "./Hamitudes.abi.json";
var hamitudesABI = [{"anonymous":false,"inputs":[{"indexed":false,"internalType":"address","name":"creator","type":"address"},{"indexed":true,"internalType":"uint256","name":"habitId","type":"uint256"},{"components":[{"internalType":"address","name":"creator","type":"address"},{"internalType":"address[]","name":"participants","type":"address[]"},{"internalType":"uint256","name":"stakes","type":"uint256"},{"internalType":"uint256","name":"duration","type":"uint256"},{"internalType":"bytes","name":"deadline","type":"bytes"},{"internalType":"uint256[]","name":"proof","type":"uint256[]"},{"internalType":"uint256[]","name":"bluff","type":"uint256[]"},{"internalType":"uint256[]","name":"challenge","type":"uint256[]"},{"internalType":"uint256[]","name":"resolution","type":"uint256[]"}],"indexed":false,"internalType":"struct Hamitudes.HabitContract","name":"habitContract","type":"tuple"}],"name":"HabitContractCreated","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"resolver","type":"address"},{"indexed":true,"internalType":"uint256","name":"habitId","type":"uint256"},{"components":[{"internalType":"address","name":"participant","type":"address"},{"internalType":"uint256","name":"reward","type":"uint256"},{"internalType":"bool","name":"success","type":"bool"}],"indexed":false,"internalType":"struct Hamitudes.HabitResolution","name":"resolution","type":"tuple"}],"name":"HabitContractResolved","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"signer","type":"address"},{"indexed":true,"internalType":"uint256","name":"habitId","type":"uint256"}],"name":"HabitContractSigned","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"challenger","type":"address"},{"indexed":true,"internalType":"uint256","name":"habitId","type":"uint256"},{"indexed":true,"internalType":"address","name":"challenged","type":"address"}],"name":"ProofCallenged","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"submitter","type":"address"},{"indexed":true,"internalType":"uint256","name":"habitId","type":"uint256"},{"indexed":false,"internalType":"bytes","name":"proof","type":"bytes"}],"name":"ProofSubmitted","type":"event"},{"inputs":[{"internalType":"uint256","name":"habitId","type":"uint256"},{"internalType":"address","name":"submitter","type":"address"}],"name":"challengeProof","outputs":[{"internalType":"bool","name":"success","type":"bool"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"","type":"uint256"},{"internalType":"address","name":"","type":"address"}],"name":"challenges","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address[]","name":"_buddies","type":"address[]"},{"internalType":"uint256","name":"_stakes","type":"uint256"},{"internalType":"uint256","name":"_duration","type":"uint256"},{"internalType":"bytes","name":"_deadline","type":"bytes"}],"name":"createHabitContract","outputs":[{"internalType":"uint256","name":"habitId","type":"uint256"}],"stateMutability":"payable","type":"function"},{"inputs":[{"internalType":"uint256","name":"","type":"uint256"}],"name":"habitContracts","outputs":[{"internalType":"address","name":"creator","type":"address"},{"internalType":"uint256","name":"stakes","type":"uint256"},{"internalType":"uint256","name":"duration","type":"uint256"},{"internalType":"bytes","name":"deadline","type":"bytes"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"habitCount","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"","type":"uint256"}],"name":"habitResolutions","outputs":[{"internalType":"address","name":"participant","type":"address"},{"internalType":"uint256","name":"reward","type":"uint256"},{"internalType":"bool","name":"success","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"","type":"uint256"},{"internalType":"address","name":"","type":"address"}],"name":"proofs","outputs":[{"internalType":"bytes","name":"","type":"bytes"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"habitId","type":"uint256"},{"internalType":"bytes","name":"proof","type":"bytes"}],"name":"proveOrBluff","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"habitId","type":"uint256"}],"name":"resolveHabit","outputs":[],"stateMutability":"payable","type":"function"},{"inputs":[{"internalType":"uint256","name":"habitId","type":"uint256"}],"name":"signHabitContract","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"","type":"uint256"},{"internalType":"address","name":"","type":"address"}],"name":"signatures","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"}];

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
  // take photo using webcam
  var picture = webcam.snap();
  console.log(picture);
  // upload photo to ??? (IPFS?)
}

// challenge someone's proof
async function challengBuddy(habitId, buddy) {
  // TODO
}

// resolve a contract
async function resolveHabit(habitId) {
  // TODO
}
