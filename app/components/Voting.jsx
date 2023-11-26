"use client";
import React, { useState } from "react";

import DiscordService from "../service/DiscordService";
const { Send } = DiscordService();

import { ethers } from "ethers";
import { useEffect, useContext } from "react";
import { ContextProvider } from "../context/Provider";

const Voting = () => {
  const { votingContract, chairperson, account } = useContext(ContextProvider);

  return (
    <>
      <VotingInfo />
      {chairperson != account && <VerifyAge />}
      <CastVoting />
      {chairperson == account && <AllowToVote />}
      {chairperson == account && <AddCandidate />}
      {chairperson == account && <ChanegeEndTime />}
    </>
  );
};

const BasicComponent = ({ lable, buttonName, onSubmit, err }) => {
  return (
    <>
      <div>
        <form
          onSubmit={onSubmit}
          className="flex flex-col justify-center items-center"
        >
          <label> {lable} </label>
          <input
            type="number"
            onChange={(e) => setTime(e.target.value)}
            name="time"
            className="w-45 h-12 rounded-lg outline-blue-100 outline focus:outline-blue-500 text-red-600"
            required
          />

          <button className="bg-teal-500 p-2 px-4 rounded-xl m-2">
            {buttonName}
          </button>
          <div>{err && err}</div>
        </form>
      </div>
    </>
  );
};

const ChanegeEndTime = () => {
  const { votingContract, account } = useContext(ContextProvider);
  const [time, setTime] = useState(undefined);

  const [err, setErr] = useState(undefined);

  const handelNewDeadLine = async (e) => {
    e.preventDefault();

    await votingContract
      .changeVotingTime(+time)
      .then((r) => r)
      .catch((err) => {
        console.log(err.reason);
        setErr(err.reason);
      });
  };

  return (
    <>
      <BasicComponent
        lable={"Increase DeadLine"}
        buttonName={"Increase DeadLine By Owner"}
        onSubmit={handelNewDeadLine}
        err={err}
      />
    </>
  );
};

const AddCandidate = () => {
  const { votingContract, account } = useContext(ContextProvider);
  const [name, setName] = useState(undefined);

  const [err, setErr] = useState(undefined);

  const handelNewCandidate = async (e) => {
    e.preventDefault();
    console.log(JSON.parse(name));

    await votingContract
      .addCandidate(JSON.parse(name))
      .then((r) => r)
      .catch((err) => {
        console.log(err.reason);
        setErr(err.reason);
      });
  };

  return (
    <>
      <div>
        <form
          onSubmit={handelNewCandidate}
          className="flex flex-col justify-center items-center"
        >
          <label> Add Candidate </label>
          <input
            type="text"
            onChange={(e) => setName(e.target.value)}
            name="name"
            className="w-45 h-12 rounded-lg outline-blue-100 outline focus:outline-blue-500 text-red-600"
            required
          />

          <button className="bg-teal-500 p-2 px-4 rounded-xl m-2">
            Add Candidate By Owner
          </button>
          <div>{err && err}</div>
        </form>
      </div>
    </>
  );
};

const AllowToVote = () => {
  const { votingContract, account } = useContext(ContextProvider);
  const [address, setAddress] = useState(undefined);

  const [err, setErr] = useState(undefined);

  const handelAllow = async (e) => {
    e.preventDefault();

    await votingContract
      .giveAllowToVote(address)
      .then((r) => r)
      .catch((err) => {
        console.log(err.reason);
        setErr(err.reason);
      });
  };

  return (
    <>
      <div>
        <form
          onSubmit={handelAllow}
          className="flex flex-col justify-center items-center"
        >
          <label>Allow Address to Vote </label>
          <input
            type="text"
            onChange={(e) => setAddress(e.target.value)}
            name="voterAddr"
            className="w-45 h-12 rounded-lg outline-blue-100 outline focus:outline-blue-500 text-red-600"
            required
          />

          <button className="bg-teal-500 p-2 px-4 rounded-xl m-2">
            Allow By Owner
          </button>
          <div>{err && err}</div>
        </form>
      </div>
    </>
  );
};

const VerifyAge = () => {
  const { votingContract, account } = useContext(ContextProvider);
  const [age, setAge] = useState(undefined);

  const [err, setErr] = useState(undefined);

  const handelAge = async (e) => {
    e.preventDefault();

    await votingContract
      .eligibleforVoteByAge(age)
      .then((r) => {
        Send("Self Verify Age", "Age Verification", age);
      })
      .catch((err) => {
        console.log(err.reason);
        Send(
          "Age Verification Error",
          "Age Verification Error",

          err.reason
        );
        setErr(err.reason);
      });
  };

  return (
    <>
      <div>
        <form
          onSubmit={handelAge}
          className="flex flex-col justify-center items-center"
        >
          <label>VerifyAge </label>
          <input
            type="number"
            onChange={(e) => setAge(e.target.value)}
            name="age"
            className="w-45 h-12 rounded-lg outline-blue-400 text-red-600"
            required
          />

          <button className="bg-teal-500 p-2 px-4 rounded-xl m-2">
            Verify
          </button>
          <div>{err && err}</div>
        </form>
      </div>
    </>
  );
};

const CastVoting = () => {
  const { votingContract, account } = useContext(ContextProvider);

  const [vote, setVote] = useState(undefined);
  const [err, setErr] = useState(undefined);

  const handelVote = async (e) => {
    e.preventDefault();

    console.log(typeof vote, vote);

    await votingContract
      .vote(+vote)
      .then((r) => {
        Send("Vote Cast", "Vote Info", vote);
      })
      .catch((err) => {
        console.log(err.reason);
        Send("Casting Error", "Voting Error", err.reason);

        setErr(err.revert.args);
      });
  };

  return (
    <>
      <div>
        <form
          onSubmit={handelVote}
          className="flex flex-col justify-center items-center"
        >
          <label>Cast Vote</label>
          <input
            type="number"
            onChange={(e) => setVote(e.target.value)}
            name="vote"
            className="w-45 h-12 rounded-lg outline-blue-400 text-red-600"
            required
          />

          <button className="bg-teal-500 p-2 px-4 rounded-xl m-2">
            Voting
          </button>
          <div>{err && err}</div>
        </form>
      </div>
    </>
  );
};

const VotingInfo = () => {
  const {
    isConnected,
    setIsConnected,
    hasMetamask,
    setHasMetamask,
    signer,
    setSigner,
    account,
    setAccount,
    balance,
    setBalance,
    error,
    setErrorMessage,
    chairperson,
    setChairperson,
    votingContract,
    setVotingContract,
  } = useContext(ContextProvider);
  const [times, setTimes] = useState(undefined);
  const [winning, setWinning] = useState(undefined);
  const [winner, setWinner] = useState(undefined);
  const [status, setStatus] = useState(undefined);
  const [voter, setVoterInfo] = useState(undefined);
  const [err, setErr] = useState(undefined);
  const [isVoted, setIsVoted] = useState(undefined);
  const [isAdult, setIsAdult] = useState(undefined);
  const [isAllow, setIsAllow] = useState(undefined);
  const [votedIndex, setVotedIndex] = useState(undefined);

  async function getRemainingTime() {
    let time = await votingContract.getRemainingTime();
    console.log(time);
    Send("Voting Time", "Time Left", time.toString());
    setTimes(time.toString());
  }
  async function winningProposal() {
    let winning = await votingContract.winningProposal();

    console.log(winning.toString());
    Send("Winning Chance", "Candidate Index", winning.toString());
    setWinning(winning.toString());
  }
  async function winnerName() {
    await votingContract
      .winnerName()
      .then((r) => {
        console.log(r);
        Send("Winner Result", "Winner", r);
        setWinner(r);
      })
      .catch((error) => {
        console.log(error.reason);
        Send("Winner Result", "Winner Status", error.reason);
        setErr(error.reason);
      });
  }
  async function getVotingStatus() {
    let state = await votingContract.getVotingStatus();

    console.log(state);
    Send("Voting Status", "isVotingContinue", state);
    setStatus(state);
  }
  async function getAddress2Voter(address) {
    let voter = await votingContract.getAddress2Voter(address);
    console.log(voter[0]);
    setIsAllow(voter[0].toString());
    setIsAdult(voter[1].toString());
    setIsVoted(voter[2].toString());
    setVotedIndex(voter[3].toString());
    console.log(voter.toString());
    let data = [isAdult, isAllow, isVoted, votedIndex];
    console.log(data);
    Send("Voter Status", "Voter Structure", data.toString());
    setVoterInfo(voter);
  }

  return (
    <>
      <div className=" flex flex-col space-y-2">
        <div>Owner== {chairperson}</div>
        <div className=" flex flex-row space-x-2">
          <div>
            <button
              onClick={() => getRemainingTime()}
              className="bg-cyan-400 p-2 rounded-xl px-4"
            >
              Remaining Time
            </button>
            <div className="flex justify-center items-center">
              {times && (times / (3600 * 24)).toFixed(4)} Days
            </div>
          </div>
          <div>
            <button
              onClick={() => winningProposal()}
              className="bg-cyan-400 p-2 rounded-xl px-4"
            >
              winningProposal
            </button>
            <div className="flex justify-center items-center">{winning}</div>
          </div>

          <div>
            <button
              onClick={() => winnerName()}
              className="bg-cyan-400 p-2 rounded-xl px-4"
            >
              winnerName
            </button>
            <div className="flex justify-center items-center">
              {winner && winner}
            </div>
            <div className="flex justify-center items-center">
              {err && "Voting not closed"}
            </div>
          </div>

          <div>
            <button
              onClick={() => getVotingStatus()}
              className="bg-cyan-400 p-2 rounded-xl px-4"
            >
              Voting Status
            </button>
            <div className="flex justify-center items-center">
              {status && "Voting Running"}
            </div>
          </div>

          <div>
            <button
              onClick={() => getAddress2Voter(account)}
              className="bg-cyan-400 p-2 rounded-xl px-4"
            >
              VoterInfo
            </button>
            <p>
              isAllow==
              {isAllow}
            </p>
            <p>
              isAdult==
              {isAdult}
            </p>
            <p>
              isVoted==
              {isVoted}
            </p>
            <p>
              votedIndex==
              {votedIndex}
            </p>

            <div className="flex justify-center items-center">
              {voter && voter}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Voting;
