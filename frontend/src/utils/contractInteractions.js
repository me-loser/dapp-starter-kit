import { ethers } from "ethers";

class ContractInteractions {
  constructor(config) {
    this.contractAddress = config.contractAddress;
    this.abi = config.abi;
    this.bytecode = config.bytecode;
    this.provider = new ethers.providers.Web3Provider(window.ethereum);
    this.contract = new ethers.Contract(
      this.contractAddress.filecoin,
      this.abi,
      this.provider.getSigner()
    );
  }
  wallet(account) {
    this.accountAddress = account;
  }
  async deployContract(unlockTime, initialAmount) {
    if (!this.accountAddress) {
      console.error("First Connect To Wallet");
      return;
    }
    try {
      const factory = new ethers.ContractFactory(
        this.abi,
        this.bytecode,
        this.provider.getSigner()
      );
      const options = {
        gasPrice: ethers.utils.parseUnits("10", "gwei"),
        gasLimit: 300000000,
        value: 1000000000000000,
      };

      const contract = await factory.deploy(unlockTime, options);
      await contract.deployed();
      this.contract = contract;
      this.contractAddress.filecoin = contract.address;
      return contract;
    } catch (error) {
      console.error("Error deploying contract:", error);
      throw error;
    }
  }
  async withdraw() {
    if (!this.accountAddress) {
      console.error("First Connect To Wallet");
      return;
    }
    try {
      const options = {
        gasPrice: ethers.utils.parseUnits("10", "gwei"),
        gasLimit: 30000000,
      };
      const result = await this.contract.withdraw(options);
      const receipt = await result.wait();
      if (receipt.status === 0) {
        throw new Error("Transaction has been reverted by the EVM");
      }
      // Listen for the Withdrawal event
      this.contract.on("Withdrawal", (amount, when, event) => {
        // This will be called when a Withdrawal event is emitted
        console.log(
          `Withdrawal of ${ethers.utils.formatEther(
            amount
          )} Ether at timestamp ${when}`
        );
        console.log("Transaction details:", event.transactionHash);
      });
      return result;
    } catch (error) {
      console.error("Error calling contract function:", error);
      throw error;
    }
  }
  async getBalance() {
    if (!this.contractAddress.filecoin) {
      console.error("Contract not deployed");
      return;
    }
    try {
      const balance = await this.provider.getBalance(
        this.contractAddress.filecoin
      );
      console.log(
        `Contract balance is: ${ethers.utils.formatEther(balance)} Ether`
      );
      return balance;
    } catch (error) {
      console.error("Error getting contract balance:", error);
      throw error;
    }
  }
}

export default ContractInteractions;
