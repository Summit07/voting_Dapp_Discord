"use client";
import React, { useState } from "react";

import { ethers } from "ethers";
import { useEffect, useContext } from "react";
import { ContextProvider } from "../context/Provider";
import DiscordService from "../service/DiscordService";
const { Send } = DiscordService();

const Navbar = () => {
  const [addr, setAddr] = useState("");
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
    chairperson,
    setErrorMessage,
    votingContract,
    setVotingContract,
  } = useContext(ContextProvider);

  async function getAcc() {
    let addr = await votingContract.getChairperson().then((r) => r);

    Send("ChairPerson", "ChairPerson Address", addr);
    setAddr(addr);
  }

  return (
    <>
      <div className="flex justify-between items-center m-4 border-b-4">
        <div className="ml-4">Logo</div>
        <div>
          <ul className=" flex space-x-4 mr-4">
            <li>{chairperson[0]}</li>
            <li> {chairperson[1]}</li>
            <li>
              Address:-{" "}
              {account
                ? `${account?.slice(0, 6)}` + "..." + `${account?.slice(-5)}`
                : ""}
            </li>
            <li>
              Balance:-
              {balance ? `${balance?.slice(0, 7)}` : ""}
            </li>
          </ul>
        </div>
      </div>
    </>
  );
};

export default Navbar;
