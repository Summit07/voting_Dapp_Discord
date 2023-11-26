// SPDX-License-Identifier: GPL-3.0
pragma solidity >=0.8.20 <0.9.0;

contract VotingContract {
    struct Voter {
        bool allowtoVote;
        bool ageStatus;
        bool voted;
        uint8 voted_to;
    }

    struct Candidate {
        string name;
        uint256 voteCount;
    }

    address public immutable _chairperson;

    uint256 public _votingStart;
    uint256 public _votingEnd;

    //  a state variable that stores a `Voter` struct for each possible address.
    mapping(address => Voter) public address2Voters;

    Candidate[] public candidates;

    /// Create a new ballot to choose one of `candidateNames`.
    constructor(string[] memory candidateNames_, uint256 durationInMinutes_) {
        _chairperson = msg.sender;
        address2Voters[_chairperson].allowtoVote = true;
        address2Voters[_chairperson].ageStatus = true;

        for (uint256 i = 0; i < candidateNames_.length; i++) {
            candidates.push(
                Candidate({name: candidateNames_[i], voteCount: 0})
            );
        }

        _votingStart = block.timestamp;
        _votingEnd = block.timestamp + (durationInMinutes_ * 1 minutes);
    }

    modifier onlyOwner() {
        require(msg.sender == _chairperson, "Only chairperson can modify");
        _;
    }

    function giveAllowToVote(address voter) external onlyOwner {
        require(!address2Voters[voter].voted, "The voter already voted.");
        require(msg.sender != voter, "owner try to verify itself again");
        require(address2Voters[voter].ageStatus, "voter not verify its age");
        address2Voters[voter].allowtoVote = true;
    }

    function eligibleforVoteByAge(uint8 _age) external {
        require(!address2Voters[msg.sender].voted, "The voter already voted.");
        require(
            address2Voters[msg.sender].ageStatus != true,
            "You already told your age."
        );

        require(
            !address2Voters[msg.sender].allowtoVote,
            "Already allowed to vote."
        );
        address2Voters[msg.sender].ageStatus = true;
        if (_age >= 18) {
            address2Voters[msg.sender].allowtoVote = true;
        }
    }

    function vote(uint8 candidateIndex_) external {
        require(block.timestamp <= _votingEnd, "Voting has closed.");
        Voter storage sender = address2Voters[msg.sender];
        require(sender.ageStatus, "Please verify your age");
        require(sender.allowtoVote, "Permission denied to vote");
        require(!sender.voted, "voter already voted.");
        sender.voted = true;
        sender.voted_to = candidateIndex_;

        candidates[candidateIndex_].voteCount += 1;
    }

    function getChairperson() public view returns (address) {
        return _chairperson;
    }

    function getCandidates() public view returns (Candidate[] memory) {
        return candidates;
    }

    function getAddress2Voter(
        address address_
    ) public view returns (Voter memory) {
        return address2Voters[address_];
    }

    function addCandidate(string[] memory candidateNames_) external onlyOwner {
        for (uint256 i = 0; i < candidateNames_.length; i++) {
            candidates.push(
                Candidate({name: candidateNames_[i], voteCount: 0})
            );
        }
    }

    function changeVotingTime(uint256 time_) external onlyOwner {
        // _votingStart = block.timestamp;
        _votingEnd = block.timestamp + (time_ * 1 minutes);
    }

    function getVotingStatus() public view returns (bool) {
        return (block.timestamp >= _votingStart &&
            block.timestamp < _votingEnd);
    }

    function getRemainingTime() public view returns (uint256) {
        require(block.timestamp >= _votingStart, "Voting has not started yet.");
        if (block.timestamp >= _votingEnd) {
            return 0;
        }
        return _votingEnd - block.timestamp;
    }

    function winningProposal() public view returns (uint8 winningIndex_) {
        uint256 winningVoteCount = 0;
        for (uint8 p = 0; p < candidates.length; p++) {
            if (candidates[p].voteCount > winningVoteCount) {
                winningVoteCount = candidates[p].voteCount;
                winningIndex_ = p;
            }
        }
    }

    function winnerName() external view returns (string memory winnerName_) {
        require(block.timestamp >= _votingEnd, "Voting has not end yet.");
        winnerName_ = candidates[winningProposal()].name;
    }
}
