"use client";
import Link from "next/link";
import { useListen } from "@/hooks/useListen";
import { useMetamask } from "@/hooks/useMetamask";

export default function Wallet() {
  const {
    dispatch,
    state: { status, isMetamaskInstalled, wallet, balance },
  } = useMetamask();
  const listen = useListen();

  const showInstallMetamask =
    status !== "pageNotLoaded" && !isMetamaskInstalled;
  const showConnectButton =
    status !== "pageNotLoaded" && isMetamaskInstalled && !wallet;

  const isConnected = status !== "pageNotLoaded" && typeof wallet === "string";

  const handleConnect = async () => {
    dispatch({ type: "loading" });
    const accounts = await window.ethereum.request({
      method: "eth_requestAccounts",
    });

    if (accounts.length > 0) {
      const balance = await window.ethereum.request({
        method: "eth_getBalance",
        params: [accounts[0], "latest"],
      });
      const balanceInEther = parseInt(balance, 16) / 10 ** 18;
      const chainId = await window.ethereum.request({
        method: "eth_chainId",
      });

      dispatch({
        type: "connect",
        wallet: accounts[0],
        balance: balanceInEther.toFixed(4),
        chainId: parseInt(chainId).toString(),
      });

      listen();
    }
  };

  const handleDisconnect = () => {
    dispatch({ type: "disconnect" });
  };

  return (
    <div>
      <div style={{ color: "white", display: "flex", gap: "2rem" }}>
        {/* {status == "loading" && <div className={"spin"}></div>} */}
        {wallet && balance && (
          <div className="wallet-details">
            <h3>
              Address:{" "}
              <span>
                {wallet.slice(0, 4)}....{wallet.slice(-4)}
              </span>
            </h3>
          </div>
        )}

        {showConnectButton && (
          <button onClick={handleConnect} className="wallet-btn">
            {status === "loading" ? (
              <div className="spin-wrapper">
                <div className="spin"></div>
              </div>
            ) : (
              "Connect Wallet"
            )}
          </button>
        )}

        {showInstallMetamask && (
          <Link
            className="install-link"
            href="https://metamask.io/"
            target="_blank"
          >
            Install Metamask
          </Link>
        )}

        {isConnected && (
          <button onClick={handleDisconnect} className="wallet-btn">
            Disconnect
          </button>
        )}
      </div>
    </div>
  );
}
