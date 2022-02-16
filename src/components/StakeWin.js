import React, { useState } from "react";
import { ethers } from "ethers";
import ABI from "../utils/abi.json";

const StakeWin = ({
  account: { web3Provider, signer, address },
  mybuddyStake,
  totalStakedToken,
  userUnclaimTokenStake,
  contractAddress,
  userTokenBalance,
  apyStaked,
  buddybalance
}) => {
  const addressZero = "0x0000000000000000000000000000000000000000";
  const [amountToStake, setAmountToStake] = useState("1");

  const claimBuddyTokensStaked = async () => {
    const contract = new ethers.Contract(contractAddress, ABI, web3Provider);
    try {
      await contract.connect(signer).claimToken_T();
      alert("Staked token claimed");
    } catch (error) {
      alert(`There was an error : ${error.message}`);
    }
  };

  const unstackedToken = async () => {
    const contract = new ethers.Contract(contractAddress, ABI, web3Provider);
    try {
      await contract.connect(signer).unStakeToken();
      alert("Buddy token unstaked");
    } catch (error) {
      console.log(error);
      alert(`There was an error please try again. ${error.message}`);
    }
  };

  const stakeBuddyToken = async () => {
    const contract = new ethers.Contract(contractAddress, ABI, web3Provider);
    try {
      await contract
        .connect(signer)
        .stakeToken(ethers.utils.parseEther(amountToStake));
      alert("Token staked token");
    } catch (error) {
      alert(`There was an error please try again. ${error.message}`);
    }
  };

  return (
    <React.Fragment>
      <section>
        <h3>Stake Win</h3>
        <p>
          Stake Win to earn Win. You can stake as many times as you want. You
          can unstake after 7 days.
        </p>
        <table>
          <tbody>
            <tr>
              <td>
                <h4>APR</h4>
              </td>
              <td id="APY_T">{apyStaked} %</td>
            </tr>
            <tr>
              <td>
                <h4>MY STAKE</h4>
              </td>
              <td id="user-token-staked">{mybuddyStake}</td>
            </tr>
            <tr>
              <td>
                <h4>TOTAL STAKE</h4>
              </td>
              <td id="total-token-staked">{totalStakedToken}</td>
            </tr>
          </tbody>
        </table>
        <table>
          <tbody>
            <tr>
              <td>
                <h4 id="time-tounstake"></h4>
              </td>
              <td align="right">
                <button
                  className="main__unstake-btn btn-gray"
                  id="unstake"
                  onClick={unstackedToken}
                >
                  UNSTAKE
                </button>
              </td>
            </tr>
          </tbody>
        </table>
        <section>
          <h4>Win Earned</h4>
          <p className="subtitle" id="user-unClaimed-T">
            <b>{userUnclaimTokenStake ? userUnclaimTokenStake : "..."}</b>
          </p>
          <img
            style={{ width: "150px" }}
            src="img/logo.png"
            alt="Icon with piggy in gold coin"
          />
          <a id="claimT" className="btn-gold" onClick={claimBuddyTokensStaked}>
            Harvest
          </a>
        </section>
        <div className="machine-input">
          <p>There is no minimum to stake</p>
          <input
            type="number"
            name="stake-busd"
            placeholder="Enter Amount"
            id="input-2"
            value={amountToStake}
            min="0"
            id="input-2"
            onChange={(e) => setAmountToStake(e.target.value)}
          />
          <button className="btn-gray" onClick={() => setAmountToStake(userTokenBalance)}>
            MAX
          </button>
          <button className="btn-gray" onClick={stakeBuddyToken}>
            STAKE
          </button>
        </div>
        <p className="info-wallet-balance">
          Wallet Balance: <span id="user-token-balance-1">{buddybalance}</span> Win
        </p>
        <img
          src="img/illu-staking-coins.png"
          alt="illustration of staking coins"
        />
      </section>
    </React.Fragment>
  );
};

export default StakeWin;
