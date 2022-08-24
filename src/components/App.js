import React, { useState, useEffect, useCallback } from "react";
import Web3 from "web3";
import "./app.css";
import Navbar from "./Navbar";
import Tether from "../truffle_abis/Tether.json";

const App = (props) => {
  const [account, setAccount] = useState("0x0");
  const [tether, setTether] = useState({});
  const [rwd, setRWD] = useState({});
  const [decentralBank, setDecentralBank] = useState({});
  const [tetherBalance, setTetherBalance] = useState("0");
  const [rwdBalance, setRWDBalance] = useState("0");
  const [stakingBalance, setStakingBalance] = useState("0");
  const [loading, setLoading] = useState(true);

  let { ethereum, web3 } = window;

  const loadWeb3 = useCallback(async () => {
    if (ethereum) {
      web3 = new Web3(ethereum);
      // await ethereum.enable();
      await ethereum.send("eth_requestAccounts");
    } else if (web3) {
      web3 = new Web3(web3.currentProvider);
      await ethereum.enable();
    } else {
      window.alert("No ethereum browser detected! You can check out Metamask!");
    }
  }, []);

  const loadBlockChainData = async () => {
    const userBlockchainAccount = await ethereum.request({
      method: "eth_accounts",
    });
    setAccount(userBlockchainAccount[0]); // setting my blockchain account
    const networkId = await web3.eth.net.getId();

    // Load Tether Contract
    const tetherData = Tether.networks[networkId];
    if (tetherData) {
      const tether = new web3.eth.Contract(Tether.abi, tetherData.address);
      setTether({ tether });
      let tetherBalance = await tether.methods.balanceOf(account).call();
      setTetherBalance(tetherBalance.toString());
    } else {
      window.alert(
        "Error! Tether contract not deployed - no detected network!"
      );
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      await loadWeb3();
      await loadBlockChainData();
    };
    fetchData();
  }, [loadWeb3]);

  return (
    <>
      <Navbar account={account} />
      <div className='test-center'>
        <h1>App</h1>
      </div>
    </>
  );
};

export default App;
