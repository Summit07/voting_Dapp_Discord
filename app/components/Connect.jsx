"use client";
import React from "react";

import { ethers } from "ethers";
import { useEffect, useContext } from "react";
import { ContextProvider } from "../context/Provider";
import Voting from "./Voting";

// const votingContractAddress = "0x65EB6Fc46b8B419ad53647E50837F0018d6266d6";
// const votingContractAddress = "0xba1C6aA8e8554810B7b33a6de724ea3DE5D57c64";
const votingContractAddress = process.env.NEXT_PUBLIC_VOTING_CONTRACT_ADDRESS;
const votingAbi = [
  {
    inputs: [
      {
        internalType: "string[]",
        name: "candidateNames_",
        type: "string[]",
      },
    ],
    name: "addCandidate",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "time_",
        type: "uint256",
      },
    ],
    name: "changeVotingTime",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint8",
        name: "_age",
        type: "uint8",
      },
    ],
    name: "eligibleforVoteByAge",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "voter",
        type: "address",
      },
    ],
    name: "giveAllowToVote",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "string[]",
        name: "candidateNames_",
        type: "string[]",
      },
      {
        internalType: "uint256",
        name: "durationInMinutes_",
        type: "uint256",
      },
    ],
    stateMutability: "nonpayable",
    type: "constructor",
  },
  {
    inputs: [
      {
        internalType: "uint8",
        name: "candidateIndex_",
        type: "uint8",
      },
    ],
    name: "vote",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "_chairperson",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "_votingEnd",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "_votingStart",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    name: "address2Voters",
    outputs: [
      {
        internalType: "bool",
        name: "allowtoVote",
        type: "bool",
      },
      {
        internalType: "bool",
        name: "ageStatus",
        type: "bool",
      },
      {
        internalType: "bool",
        name: "voted",
        type: "bool",
      },
      {
        internalType: "uint8",
        name: "voted_to",
        type: "uint8",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    name: "candidates",
    outputs: [
      {
        internalType: "string",
        name: "name",
        type: "string",
      },
      {
        internalType: "uint256",
        name: "voteCount",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "address_",
        type: "address",
      },
    ],
    name: "getAddress2Voter",
    outputs: [
      {
        components: [
          {
            internalType: "bool",
            name: "allowtoVote",
            type: "bool",
          },
          {
            internalType: "bool",
            name: "ageStatus",
            type: "bool",
          },
          {
            internalType: "bool",
            name: "voted",
            type: "bool",
          },
          {
            internalType: "uint8",
            name: "voted_to",
            type: "uint8",
          },
        ],
        internalType: "struct VotingContract.Voter",
        name: "",
        type: "tuple",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "getCandidates",
    outputs: [
      {
        components: [
          {
            internalType: "string",
            name: "name",
            type: "string",
          },
          {
            internalType: "uint256",
            name: "voteCount",
            type: "uint256",
          },
        ],
        internalType: "struct VotingContract.Candidate[]",
        name: "",
        type: "tuple[]",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "getChairperson",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "getRemainingTime",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "getVotingStatus",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "winnerName",
    outputs: [
      {
        internalType: "string",
        name: "winnerName_",
        type: "string",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "winningProposal",
    outputs: [
      {
        internalType: "uint8",
        name: "winningIndex_",
        type: "uint8",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
];
const votingAbis = [
  {
    inputs: [
      {
        internalType: "string[]",
        name: "candidateNames_",
        type: "string[]",
      },
    ],
    name: "addCandidate",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "time_",
        type: "uint256",
      },
    ],
    name: "changeVotingTime",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint8",
        name: "_age",
        type: "uint8",
      },
    ],
    name: "eligibleforVoteByAge",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "voter",
        type: "address",
      },
    ],
    name: "giveAllowToVote",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "string[]",
        name: "candidateNames_",
        type: "string[]",
      },
      {
        internalType: "uint256",
        name: "durationInMinutes_",
        type: "uint256",
      },
    ],
    stateMutability: "nonpayable",
    type: "constructor",
  },
  {
    inputs: [
      {
        internalType: "uint8",
        name: "candidateIndex_",
        type: "uint8",
      },
    ],
    name: "vote",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    name: "address2Voters",
    outputs: [
      {
        internalType: "bool",
        name: "allowtoVote",
        type: "bool",
      },
      {
        internalType: "bool",
        name: "ageStatus",
        type: "bool",
      },
      {
        internalType: "bool",
        name: "voted",
        type: "bool",
      },
      {
        internalType: "uint8",
        name: "voted_to",
        type: "uint8",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    name: "candidates",
    outputs: [
      {
        internalType: "string",
        name: "name",
        type: "string",
      },
      {
        internalType: "uint256",
        name: "voteCount",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "getChairperson",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "getRemainingTime",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "getVotingStatus",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "winnerName",
    outputs: [
      {
        internalType: "string",
        name: "winnerName_",
        type: "string",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "winningProposal",
    outputs: [
      {
        internalType: "uint8",
        name: "winningIndex_",
        type: "uint8",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
];

const Connect = () => {
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

  useEffect(() => {
    if (typeof window.ethereum !== "undefined") {
      setHasMetamask(true);
    }
  }, []);

  async function connect() {
    if (typeof window.ethereum !== "undefined") {
      try {
        await ethereum.request({
          method: "eth_requestAccounts",
        });
        const provider = new ethers.BrowserProvider(window.ethereum);
        let signer = await provider.getSigner();
        let address = await signer.getAddress();
        let bal = await provider.getBalance(address);

        setIsConnected(true);
        setAccount(address);
        setBalance(ethers.formatEther(bal));

        let votingInstanciate = new ethers.Contract(
          votingContractAddress,
          votingAbi,
          signer
        );

        setVotingContract(votingInstanciate);

        const chairperson = await votingInstanciate.getChairperson();
        setChairperson(chairperson);
        setErrorMessage(undefined);
      } catch (error) {
        console.log(error.revert.args);
        // setAccount(undefined);
        // setBalance(undefined);
        setErrorMessage(error.revert.args);
      }
    } else {
      setIsConnected(false);
    }
  }

  // update account, will cause component re-render
  const accountChangedHandler = () => {
    connect();
  };

  const chainChangedHandler = () => {
    window.location.reload();
  };

  useEffect(() => {
    if (window.ethereum) {
      window.ethereum.on("accountsChanged", accountChangedHandler);
      window.ethereum.on("chainChanged", chainChangedHandler);
    }
  }, []);

  return (
    <div>
      {hasMetamask ? (
        isConnected ? (
          ""
        ) : (
          <button
            onClick={() => connect()}
            className="bg-cyan-400 p-2 rounded-xl px-4"
          >
            Connect to Wallet
          </button>
        )
      ) : (
        "Please install metamask"
      )}

      {isConnected ? (
        <>
          <div className="mt-0">
            {" "}
            <Voting />
          </div>

          <div className=" w-full p-4 text-black">{error ? error : ""}</div>
        </>
      ) : (
        <div className=" w-full p-4 text-black">{error ? error : ""}</div>
      )}
    </div>
  );
};

export default Connect;
