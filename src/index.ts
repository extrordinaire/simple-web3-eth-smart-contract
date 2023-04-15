import "./styles.css";
/// You can use either one of the following imports:
import Web3 from "web3";
//import { ethers } from "ethers";

/// Contains needed settings, as nodeUrl, contractAddress, and abi
import { settings } from "./settings";

/// This is a definition of the type of object returned by the contract
/// and is what the addProposalToList function expects as input parameter
import { Proposal } from "./Proposal";

/// Allows to add a proposal to the list
import { addProposalToList } from "./utils";

/// Empties the list
import { resetList } from "./utils";

/// Set the app loading status to true or false
import { setLoading } from "./utils";

const web3 = new Web3(settings.nodeUrl);

const contract = new web3.eth.Contract(
  settings.contractAbi,
  settings.contractAddress
);

const main = async () => {
  setLoading(true);
  // Write your code here

  resetList();

  const proposalsCount = await contract.methods.getProposalsCount().call();
  for (let i = 0; i < proposalsCount; i++) {
    const proposal: Proposal = await contract.methods.proposals(i).call();
    addProposalToList(proposal);
  }

  setLoading(false);
};

main();
