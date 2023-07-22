// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;

// Des habitudes avec tes amis!
contract Hamitudes {

    // struct for HabitContract
    struct HabitContract {
        address creator;
        address[] participants;
        uint256 stakes;
        uint256 duration;
        bytes deadline;
        uint256[] proof;
        uint256[] bluff;
        uint256[] challenge;
        uint256[] resolution;
    }

    struct HabitResolution {
        address participant;
        uint256 reward;
        bool success;
    }

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
    mapping(uint256 => mapping(address => bytes)) public proofs;

    // mapping to track challenges
    mapping(uint256 => mapping(address => address)) public challenges;

    // events
    event HabitContractCreated(address creator, uint256 indexed habitId, HabitContract habitContract);
    event HabitContractSigned(address indexed signer, uint256 indexed habitId);
    event ProofSubmitted(address indexed submitter, uint256 indexed habitId, bytes proof);
    event ProofCallenged(address indexed challenger, uint256 indexed habitId, address indexed challenged);
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
        // TODO: check that buddies are not empty
        // TODO: add creator and buddies to participants
        // TODO: create a new habit contract and add to mapping
        // emit creation event
        // emit HabitContractCreated(msg.sender, habitId, habitContracts[habitId]);
        return habitId;
    }

    /*
     * @dev sign a habit contract
     * @param habitId - id of the habit contract
     */
    function signHabitContract(uint256 habitId) public {
        // check contract hasn't been signed yet (don't waste gas!)
        require(!signatures[habitId][msg.sender], "Contract already signed");
        // TODO: mark contract as signed
        emit HabitContractSigned(msg.sender, habitId);
    }

    /*
     * @dev upload a photo proof or a bluff 
     * @param habitId - id of the habit contract
     * @param proof - bytes of the proof
     */
    function proveOrBluff(uint256 habitId, bytes calldata proof) public {
        // TODO: add zk proof to contract
        // TODO: emit event
    }

    /* 
     * @dev challenge someone's proof
     * @param habitId - id of the habit contract
     * @param submitter - address of the proof submitter to challenge
     * @return success - whether the challenge was successful
     */
    function challengeProof(uint256 habitId, address submitter) public returns (bool success) {
        // TODO: check that the buddy is a participant
        // TODO: check that no one has challenged this proof submitter yet
        // TODO: record the challenge and return whether it was successful
        emit ProofCallenged(msg.sender, habitId, submitter);
        return success;
    }

    /* 
     * @dev resolve a contract and send out rewards to participants
     * @param habitId - id of the habit contract
     */
    function resolveHabit(uint256 habitId) payable public {
        // TODO: check that the contract is over (period has ended)
        // TODO: split the fund based on successful challenges
        // TODO: pay the participants
        // emit HabitContractResolved(msg.sender, habitId, habitResolutions[habitId])
    }

}
