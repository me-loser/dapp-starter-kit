const fs = require("fs");
const { execSync } = require("child_process");
const path = require("path");

// Run the Hardhat compile command
execSync("npx hardhat compile", { stdio: "inherit" });

// Import the artifact file
const artifactPath = path.join(
  __dirname,
  "./artifacts/contracts/Lock.sol/Lock.json"
);
const artifact = require(artifactPath);

// Extract the ABI and bytecode
const contractData = {
  contractAddress: "",
  abi: artifact.abi,
  bytecode: artifact.bytecode,
};

// Write the ABI and bytecode to a new JSON file
const outputPath = path.join(__dirname, "../frontend/config/config.json");
fs.writeFileSync(outputPath, JSON.stringify(contractData, null, 2));

console.log("Contract data written to ", outputPath);
