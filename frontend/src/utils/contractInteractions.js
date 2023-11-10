import { ethers } from "ethers";

class ContractInteractions {
  constructor(config) {
    this.contractAddress = config.contractAddress;
    this.contractABI = config.contractABI;
    this.provider = new ethers.providers.Web3Provider(window.ethereum);
    this.contract = new ethers.Contract(
      this.contractAddress,
      this.contractABI,
      this.provider.getSigner()
    );
  }
  wallet(account) {
    this.accountAddress = account;
  }
  async withdraw() {
    if (!this.accountAddress) {
      console.error("First Connect To Wallet");
      return;
    }
    try {
      const result = await this.contract.withdraw();
      return result;
    } catch (error) {
      console.error("Error calling contract function:", error);
      throw error;
    }
  }
}

export default ContractInteractions;
