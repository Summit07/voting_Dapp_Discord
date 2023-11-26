"use client";
import React from "react";
import { useState, createContext } from "react";
export const ContextProvider = createContext({});

export default function ReduxProvider({ children }) {
  const [isConnected, setIsConnected] = useState(false);
  const [hasMetamask, setHasMetamask] = useState(false);
  const [signer, setSigner] = useState(undefined);
  const [account, setAccount] = useState(undefined);
  const [balance, setBalance] = useState(undefined);
  const [chairperson, setChairperson] = useState([]);
  const [votingContract, setVotingContract] = useState(undefined);
  const [error, setErrorMessage] = useState([undefined]);

  return (
    <ContextProvider.Provider
      value={{
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
      }}
    >
      {children}
    </ContextProvider.Provider>
  );
}
