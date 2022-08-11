const DecentralBank = artifacts.require("DecentralBank");

module.exports = async function issueRewards(callback) {
  let deployedDecentralBank = await DecentralBank.deployed();
  await deployedDecentralBank.issueTokens();
  console.log("Tokens have been issued successfully");
  callback();
};
