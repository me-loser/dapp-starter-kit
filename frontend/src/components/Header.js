"use client";
import Wallet from "./Wallet";
import { useListen } from "@/hooks/useListen";
import { useMetamask } from "@/hooks/useMetamask";
import { useEffect } from "react";

const Header = () => {
  const { dispatch } = useMetamask();
  const listen = useListen();

  useEffect(() => {
    if (typeof window !== undefined) {
      const ethereumProviderInjected = typeof window.ethereum !== "undefined";

      const isMetamaskInstalled =
        ethereumProviderInjected && Boolean(window.ethereum.isMetaMask);

      const local = window.localStorage.getItem("metamaskState");

      if (local) {
        listen();
      }

      const { wallet, balance, chainId } = local
        ? JSON.parse(local)
        : { wallet: null, balance: null };

      dispatch({
        type: "pageLoaded",
        isMetamaskInstalled,
        wallet,
        balance,
        chainId,
      });
    }
  }, []);
  return (
    <nav
      style={{
        backgroundColor: "#202020",
        padding: "1rem 2rem",
        display: "flex",
        justifyContent: "flex-end",
        alignItems: "center",
      }}
    >
      <Wallet />
    </nav>
  );
};

export default Header;
