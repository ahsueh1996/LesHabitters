// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;

// Des habitudes avec tes amis!
contract Hamitudes {

    bytes BLUFF_STRING = "This is a bluff.";

    // struct for HabitContract
    struct HabitContract {
        address creator;
        address[] participants;
        uint256 stakes;
        uint256 duration;
        bytes deadline;
        uint256 createdAt;
    }

    struct HabitResolution {
        address participant;
        uint256 reward;
        bool success;
    }

    // mapping to track a user's habit outcome of a game
    mapping(uint256 => mapping(address => bool)) public habitOutcomes;

    // mapping to track player's habit building outcome
    mapping(uint256 => mapping(address => mapping(bool => uint256))) public habitStatus;

    // mapping to track total money pool in front of each player
    mapping(uint256 => mapping(address => uint256)) public playerFunds;

    // total number of habit contracts
    uint256 public habitCount;

    // mapping to track habit contracts
    // note: consider making a factory of contracts in the future to separate funds and avoid hitting gas limits
    mapping(uint256 => HabitContract) public habitContracts;

    // mapping to track habit resolutions
    mapping(uint256 => HabitResolution) public habitResolutions;

    // mapping to track participant signatures
    mapping(uint256 => mapping(address => bool)) public signatures;

    // mapping to track participant proofs
    mapping(uint256 => mapping(address => bytes[])) public proofs;

    // mapping to track challenges
    // the mapping key is the challenged user
    // the mapping value is the challenging user)
    mapping(uint256 => mapping(address => address)) public challenges;

    // events
    event HabitContractCreated(address creator, uint256 indexed habitId, HabitContract habitContract);
    event HabitContractSigned(address indexed signer, uint256 indexed habitId);
    event ProofSubmitted(address indexed submitter, uint256 indexed habitId, bytes proof);
    event ProofChallenged(address indexed challenger, uint256 indexed habitId, address indexed challenged);
    event HabitContractResolved(address indexed resolver, uint256 indexed habitId, HabitResolution resolution);

    /*
     * @dev create a habit contract
     * @param _buddies - array of addresses
     * @param _stakes - stake amount per day per person
     * @param _duration - duration of the habit in days
     * @param _deadline - time of day to check in (e.g. 0900 for 9am)
     * @return habitId - id of the habit contract
     */
    function createHabitContract(address[] memory _buddies, uint256 _stakes, uint256 _duration, bytes calldata _deadline) payable public returns (uint256 habitId) {

        // check creator send enough fund to start a new game
        require(msg.value == _stakes * _duration, "Insufficient fund");
        
        // TODO: check that buddies are not empty
        require(_buddies.length > 0, "Buddy list must not be empty");

        // add creator and buddies to participants
        address[] memory participants = new address[](_buddies.length + 1);
        participants[0] = msg.sender;
        for (uint256 i = 0; i < _buddies.length; i++) {
            participants[i+1] = _buddies[i];
        }
        
        // create a new habit contract and add to mapping
        HabitContract memory newHabitContract = HabitContract(
            msg.sender,
            participants,
            _stakes,
            _duration,
            _deadline,
            block.timestamp
        );
        // assign to mapping at habitCount
        habitId = habitCount;
        habitContracts[habitId] = newHabitContract;
        // increment habitCount
        habitCount++;

        // creator transfer funds to the contract
        payable(address(this)).transfer(msg.value);

        // assign initial on-table money distribution to the game creator
        playerFunds[habitId][msg.sender] = msg.value;

        // creator signs as a participant
        signatures[habitId][msg.sender] = true;

        // emit creation event
        emit HabitContractCreated(newHabitContract.creator, habitId, newHabitContract);
        // emit HabitContractCreated(msg.sender, habitId, habitContracts[habitId]);
        return habitId;
    }

    /*
     * @dev other participants sign a habit contract to join a game
     * @param habitId - id of the habit contract
     */
    function signHabitContract(uint256 habitId) payable public {
        
        // check signer send enough fund to start a new game
        require(msg.value == habitContracts[habitId].stakes * habitContracts[habitId].duration, "Insufficient fund");

        // check contract hasn't been signed yet (don't waste gas!)
        require(!signatures[habitId][msg.sender], "Contract already signed");

        // check if signer is a participant of this habit contract
        // check if msg.sender is an element of the participants list
        bool isSignerInParticipants = false;
        for (uint i; i < habitContracts[habitId].participants.length; i++) {
            if (msg.sender == habitContracts[habitId].participants[i]) {
                isSignerInParticipants = true;
            }
        }
        require(isSignerInParticipants == true, "Signer has to be a participant");

        // assign initial on-table money distribution to the game creator
        playerFunds[habitId][msg.sender] = msg.value;

        // mark contract as signed
        signatures[habitId][msg.sender] = true;

        emit HabitContractSigned(msg.sender, habitId);
    }

    /*
     * @dev upload a photo proof or a bluff 
     * @param habitId - id of the habit contract
     * @param proof - bytes of the proof
     */
    function proveOrBluff(uint256 habitId, bytes calldata proof) public {
        // add zk proof to contract
        proofs[habitId][msg.sender].push(proof);

        // check if proof is the bluff string
        if (keccak256(abi.encodePacked(proof)) == keccak256(abi.encodePacked(BLUFF_STRING))) {
            habitStatus[habitId][msg.sender][false] += 1;
        } else {
            habitStatus[habitId][msg.sender][true] += 1;
        }

        // emit event
        emit ProofSubmitted(msg.sender, habitId, proofs[habitId][msg.sender][proofs[habitId][msg.sender].length]);
    }

    /* 
     * @dev challenge someone's proof
     * @param habitId - id of the habit contract
     * @param submitter - address of the proof submitter to challenge
     * @return success - whether the challenge was successful
     */
    function challengeProof(uint256 habitId, address submitter) payable public returns (bool success) {
        // check signer send enough fund to challenge another player
        require(msg.value == habitContracts[habitId].stakes, "Insufficient fund");

        // require that the msg sender is not the submitter
        require(msg.sender != submitter, "You cannot challenge yourself");

        // check that no one has challenged this proof submitter yet
        require(challenges[habitId][submitter] == 0x0000000000000000000000000000000000000000, "The proof submitter cannot have been challenged already");

        // check that the buddy is a participant
        bool isBuddyInParticipants = false;
        for (uint i; i < habitContracts[habitId].participants.length; i++) {
            if (msg.sender == habitContracts[habitId].participants[i]) {
                isBuddyInParticipants = true;
            }
        }
        require(isBuddyInParticipants == true, "Buddy has to be a participant");

        // challenger pays for the challenge against the target
        payable(address(this)).transfer(msg.value);

        // update player fund
        playerFunds[habitId][msg.sender] += msg.value;

        bool isProofReal = true;

        // check if proof is the bluff string
        bytes memory proof = proofs[habitId][msg.sender][proofs[habitId][msg.sender].length-1];
        if (keccak256(abi.encodePacked(proof)) == keccak256(abi.encodePacked(BLUFF_STRING))) {
            isProofReal = false;
        }

        // record the challenge and return whether it was successful
        challenges[habitId][submitter] = msg.sender;

        // update player fund based on challenge outcome
        bool isChallengeSuccessful = !isProofReal;
        if (isChallengeSuccessful) {
            playerFunds[habitId][submitter] -= msg.value;
            playerFunds[habitId][msg.sender] += msg.value;
        } else {
            playerFunds[habitId][msg.sender] -= msg.value;
            playerFunds[habitId][submitter] += msg.value;
        }

        emit ProofChallenged(msg.sender, habitId, submitter);
        
        return isChallengeSuccessful;
    }

    /* 
     * @dev resolve a contract and send out rewards to participants
     * @param habitId - id of the habit contract
     */
    function resolveHabit(uint256 habitId) payable public {
        // check that the contract is over (period has ended)
        require(block.timestamp > habitContracts[habitId].createdAt + habitContracts[habitId].duration * 1 days, "Contract is not over yet");

        // return users' fund back to them
        for (uint256 i = 0; i < habitContracts[habitId].participants.length; i++) {
            address payable participant = payable(habitContracts[habitId].participants[i]);

            uint256 successCount = habitStatus[habitId][participant][true];
            uint256 failureCount = habitStatus[habitId][participant][false];

            habitOutcomes[habitId][participant] = successCount * 100 / (successCount + failureCount) > 75;

            uint256 reward = playerFunds[habitId][participant];

            participant.transfer(reward);

            // reset the player's fund
            playerFunds[habitId][participant] = 0;
        }

        emit HabitContractResolved(msg.sender, habitId, habitResolutions[habitId]);
    }
}