import React, { useState } from "react";
import { ethers } from "ethers";
import ABI from "../utils/abi.json";
import BUSDABI from "../utils/busd.json";

const StakeBusd = ({
  account: { web3Provider, signer, address },
  contractAddress,
  userBscStaked,
  contractBUSDBalance,
  userUnclaimTokenMinting,
  bscBalance,
  referralAddress,
  apyMinted,
}) => {
  const bscAddress = "0xe9e7CEA3DedcA5984780Bafc599bD69ADd087D56";
  const [minimumBusd, setMinimumBusd] = useState("5");
  const [amountToInvest, setAmountToInvest] = useState("5");
  const addressZero = "0x0000000000000000000000000000000000000000";

  const handleAmountToInvest = (e) => {
    const value = e.target.value;
    if (+value < 5) {
      setAmountToInvest(5);
    }
    setAmountToInvest(value);
  };

  const handleMinimumValue = (e) => {
    const value = e.target.value;
    if (+value < 5) {
      setMinimumBusd(5);
    }
    setMinimumBusd(value);
  };

  const claimTokensMinted = async () => {
    const buddyContract = new ethers.Contract(
      contractAddress,
      ABI,
      web3Provider
    );
    try {
      await buddyContract.connect(signer).claimToken_M();
      alert("Minted token claimed");
    } catch (error) {
      alert(`There was an error : ${error.message}`);
    }
  };

  const approveBUSD = async () => {
    try {
      const bscContract = new ethers.Contract(
        bscAddress,
        BUSDABI,
        web3Provider
      );
      await bscContract
        .connect(signer)
        .approve(contractAddress, ethers.utils.parseEther(minimumBusd));
      alert(
        `Approval granted to BDMT TOKEN contract to spend funds on behalf of ${address}`
      );
    } catch (error) {
      alert(`Error: ${error.message}`);
    }
  };

  const stakeBUSDToInvest = async () => {
    if (amountToInvest < 5) {
      alert("The minimum stake of BUSD is 5 $BUSD");
      return;
    }
    const contract = new ethers.Contract(contractAddress, ABI, web3Provider);
    try {
      let refferal;
      if (referralAddress) {
        refferal = referralAddress;
      } else {
        refferal = addressZero;
      }
      await contract
        .connect(signer)
        .stakeBUSD(refferal, ethers.utils.parseEther(amountToInvest));
      alert("BSC token staked");
    } catch (error) {
      alert(`There was an error please try again. ${error.message}`);
    }
  };

  return (
    <React.Fragment>
      <section>
        <h3>Mint Win</h3>
        <p>
          Mint Win by staking your BUSD You can stake as many times as you want.
          You cannot unstake this BUSD.
        </p>
        <table>
          <tbody>
            <tr>
              <td>
                <h4>APR</h4>
              </td>
              <td id="APY_M">{apyMinted}%</td>
            </tr>
            <tr>
              <td>
                <h4>MY STAKE</h4>
              </td>
              <td id="user-BUSD-staked">{userBscStaked} $BUSD</td>
            </tr>
            <tr>
              <td>
                <h4>TOTAL STAKE</h4>
              </td>
              <td id="total-BUSD-staked">{contractBUSDBalance} $BUSD</td>
            </tr>
          </tbody>
        </table>
        <section>
          <h4>Win Minted</h4>
          <p className="subtitle" id="user-unClaimed-M">
            {userUnclaimTokenMinting}
          </p>
          <img
            src="img/icon-piggy-coin.png"
            alt="Icon with piggy in gold coin"
          />
          <a id="claimM" className="btn-gold" onClick={claimTokensMinted}>
            Claim
          </a>
        </section>
        <div className="machine-input">
          <p>Approve BUSD spend</p>
          <input
            type="number"
            name="approve-busd"
            id="input-approve"
            placeholder="Enter Amount"
            value={minimumBusd}
            onChange={handleMinimumValue}
          />
          <button onClick={approveBUSD}>APPROVE</button>
        </div>
        <div className="machine-input">
          <p>There is $5 minimum</p>
          <input
            type="number"
            name="use-busd"
            id="input-busd"
            placeholder="Enter Amount"
            value={amountToInvest}
            min="5"
            onChange={handleAmountToInvest}
          />
          <button
            className="btn-gray"
            onClick={() => setMinimumBusd(bscBalance)}
          >
            MAX
          </button>
          <button className="btn-gray" onClick={stakeBUSDToInvest}>
            INVEST
          </button>
        </div>
        <p className="info-wallet-balance">
          Wallet Balance: <span id="user-BUSD-balance-1">{bscBalance}</span>{" "}
          BUSD
        </p>
        <img
          src="img/illu-coins-added-to-piggy.png"
          alt="illustration of filling piggy bank with tokens"
        />
      </section>
    </React.Fragment>
  );
};

export default StakeBusd;
