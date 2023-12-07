import React, { createContext, useContext, useState, useEffect } from "react";
import ContractInteractions from "../utils/contractInteractions";
import config from "../../config/config.json";
import { useMetamask } from "@/hooks/useMetamask";

const ContractContext = createContext();

export const useContract = () => {
  return useContext(ContractContext);
};

export const ContractProvider = ({ children }) => {
  const [lock, setLock] = useState(null);
  const { state } = useMetamask();
  const { wallet, isMetamaskInstalled, chainId } = state;
  useEffect(() => {
    if (!lock) {
      if (isMetamaskInstalled) {
        const contractInstance = new ContractInteractions(config);
        contractInstance.wallet(wallet);
        setLock(contractInstance);
      }
    } else if (wallet) {
      lock.wallet(wallet);
    }
    if (chainId) {
      const contractInstance = new ContractInteractions(config);
      contractInstance.wallet(wallet);
      setLock(contractInstance);
    }
  }, [isMetamaskInstalled, wallet, chainId]);

  return (
    <ContractContext.Provider value={lock}>{children}</ContractContext.Provider>
  );
};
