
function parse_ui_contract() {
    var term_num_days = $("#term_num_days").val();
    var term_stake_per_offense = $("#term_stake_per_offense").val();
    var stake = Number(term_num_days) * Number(term_stake_per_offense);
    var term_buddy_1 = $("#term_buddy_1").val();
    var term_buddy_2 = $("#term_buddy_2").val();
    return {duration: term_num_days, stake: stake, buddies: [term_buddy_1, term_buddy_2]}
}

function fill_ui_contract(contract) {
    console.log("fill_ui_contract with: ", contract);
    try {
        document.getElementById("term_stake_per_offense").setAttribute("value", contract.stake/contract.duration);
        document.getElementById("term_buddy_1").setAttribute("value", contract.creator);
        document.getElementById("term_buddy_2").setAttribute("value", contract.participants[0]);
        document.getElementById("term_num_days").setAttribute("value", contract.duration);
        // unknowns for now, TODO need some sort of database
        document.getElementById("term_date").setAttribute("value", "2023-07-23");
        document.getElementById("term_upload_time").setAttribute("value", "09:00:00");
        document.getElementById("term_habit").setAttribute("value", "Running");
        document.getElementById("term_number").setAttribute("value", 2);
        document.getElementById("term_esignature").setAttribute("value", "Enter your Name");
        // make each element to disabled
        document.getElementById("term_stake_per_offense").setAttribute("disable", true);
        document.getElementById("term_buddy_1").setAttribute("disable", true);
        document.getElementById("term_buddy_2").setAttribute("disable", true);
        document.getElementById("term_num_days").setAttribute("disable", true);
        document.getElementById("term_date").setAttribute("disable", true);
        document.getElementById("term_upload_time").setAttribute("disable", true);
        document.getElementById("term_habit").setAttribute("disable", true);
        document.getElementById("term_number").setAttribute("disable", true);
    } catch (err) {
        console.log("fill_ui_contract failed: ", err);
    }
}

async function find_contract() {
    console.log("find_contract");
    var contract_id = $('#contract_id').val();
    console.log("find_contract"+contract_id);
    document.getElementById("2a").style.display = "none";
    // alert("hide 2a");
    document.getElementById("2b").style.display = "block";
    // alert("show 2b");
    // Requires backend get_contract();
    //var contract = await get_contract(contract_id);
    var contract = { duration: 30, stake: 100, creator: "0xbuddy1", participants: ["0xbuddy2"]};
    fill_ui_contract(contract);
}

async function start_contract_draft() {
    console.log("start_contract_draft");
    document.getElementById("3a").style.display = "none";
    document.getElementById("3b").style.display = "block";
}

function participant_sign_contract() {
    var contract_id = $('#contract_id').val();
    console.log("participant_sign_contract: "+contract_id);
    // Requires backend participant_sign_contract();
    // on success
    alert("Contract signed! Make sure to upload a photo every day!");
    document.location.href = "http://44.198.57.17/h1/";
    document.body.style.zoom="50%"
}

function creator_sign_contract() {
    console.log("creator_sign_contract");
    if (wallet.accounts[0] == null) {
        connectMM_MMSDK();
    }
    console.log("creator is: "+wallet.accounts[0]);
    data = parse_ui_contract();
    console.log("got from ui: ", data);
    stake = data.stake;
    duration = data.duration;
    buddies = data.buddies;
    // Requires backend create_contract();
    // var contract_id = await create_contract(stake, duration, buddies);
    contract_id = 0;
    alert("Contract created! Please invite your buddy to sign contract number: "+contract_id);
    document.location.href = "http://44.198.57.17/h1/";
    document.body.style.zoom="50%"
}


$(document).ready(function(){
    try {
        document.getElementById("btn_search_contract_id").addEventListener("click", async () => {
            find_contract();
        });
        console.log("btn_search_contract_id event listener added");
        document.getElementById("2b").style.display = "none";
        console.log("hide 2b");
    } catch {
        console.log("btn_search_contract_id event listener skipped");
    }
    try {
        document.getElementById("btn_start_contract_draft").addEventListener("click", async () => {
            start_contract_draft();
        });
        console.log("btn_start_contract_draft event listener added");
        document.getElementById("3b").style.display = "none";
        console.log("hide 3b");
    } catch {
        console.log("btn_start_contract_draft event listener skipped");
    }
    try {
        document.getElementById("btn_participant_sign_contract").addEventListener("click", async () => {
            participant_sign_contract();
        });
    } catch {
        console.log("btn_participant_sign_contract event listener skipped");
    }
    try {
        document.getElementById("btn_creator_sign_contract").addEventListener("click", async () => {
            creator_sign_contract();
        });
    } catch {
        console.log("btn_creator_sign_contract event listener skipped");
    }
});