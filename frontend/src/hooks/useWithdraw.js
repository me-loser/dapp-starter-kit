"use client";
import { useContract } from "@/contexts/contractContext";
import { useState } from "react";
const useWithdraw = () => {
  const [isWithdrawing, setIsWithdrawing] = useState(false);
  const contractInstance = useContract();

  const handleWithdraw = async () => {
    try {
      setIsWithdrawing(true);
      const result = await contractInstance.withdraw();
      console.log(result);
      setIsWithdrawing(false);
    } catch (error) {
      console.log(error);
      setIsWithdrawing(false);
    }
  };

  return {
    handleWithdraw,
    isWithdrawing,
  };
};

export default useWithdraw;
