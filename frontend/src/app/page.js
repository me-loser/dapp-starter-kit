"use client";
import Header from "@/components/Header";
import useWithdraw from "@/hooks/useWithdraw";
import classes from "@/styles/page.module.css";
import { useContract } from "@/contexts/contractContext";
import { useState } from "react";
import { ethers } from "ethers";

export default function App() {
  const [isDeploying, setIsDeploying] = useState(false);
  const { handleWithdraw, isWithdrawing } = useWithdraw();
  const contract = useContract();
  const handleDeploy = async () => {
    try {
      setIsDeploying(true);
      const contractDetails = await contract.deployContract(
        Math.floor(Date.now() / 1000) + 60 * 60,
        "1"
      );
      console.log(contractDetails);
      setIsDeploying(false);
    } catch (err) {
      console.log(err);
      setIsDeploying(false);
    }
  };
  const handleGetBalance = async () => {
    try {
      const balance = await contract.getBalance();
      console.log(ethers.utils.formatEther(balance));
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <main>
      <Header />
      <div className={classes.container}>
        <button className={classes.btn} onClick={handleWithdraw}>
          {isWithdrawing ? "Withdrawing..." : "Withdraw From Lock"}
        </button>
        <button className={classes.btn} onClick={handleDeploy}>
          {isDeploying ? <div className="spin"></div> : "Deploy Contract"}
        </button>
        <button className={classes.btn} onClick={handleGetBalance}>
          get balance
        </button>
      </div>
    </main>
  );
}
