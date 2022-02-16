import React, { useState } from "react";
import { ethers } from "ethers";
import ABI from "../utils/abi.json";

const dateConverter = (secs) => {
  var sec_num = parseInt(secs, 10);
  var hours = Math.floor(sec_num / 3600);
  var minutes = Math.floor(sec_num / 60) % 60;
  var seconds = sec_num % 60;

  return [hours, minutes, seconds]
    .map((v) => (v < 10 ? "0" + v : v))
    .filter((v, i) => v !== "00" || i > 0)
    .join(":");
};

const calculateBUSDToReceiveOnSale = (tokenAmount, tokenPrice) => {
  return parseFloat(tokenAmount * tokenPrice).toFixed(8);
};

const SellWin = ({
  account: { web3Provider, signer, address },
  contractAddress,
  getTimeToNextDay,
  tokenPrice,
  buddyTokenBalance,
  totalAvailableToSell,
  totalSoldToday,
}) => {
  const [tokenToSell, setTokenToSell] = useState("1");

  const handleTokenToSell = (e) => {
    const value = e.target.value;
    setTokenToSell(value);
  };

  const sellBuddyToken = async () => {
    const contract = new ethers.Contract(contractAddress, ABI, web3Provider);
    try {
      await contract
        .connect(signer)
        .sellToken(ethers.utils.parseEther(tokenToSell));
      alert("Token sold");
    } catch (error) {
      alert(`There was an error please try again. ${error.data.message}`);
    }
  };
  return (
    <React.Fragment>
      <section>
        <h3>Sell Win</h3>
        <p>
          Sell earned tokens. Only 500000000 tokens can be sold per day Earn BUSD.
        </p>
        <table>
          <tbody>
            <tr>
              <td>
                <h4>Sold today</h4>
              </td>
              <td id="total-sold-today">{totalSoldToday}</td>
            </tr>
            <tr>
              <td>
                <h4>Available today</h4>
              </td>
              <td id="available-to-sell">{totalAvailableToSell}</td>
            </tr>
            <tr>
              <td>
                <h4>Reset In</h4>
              </td>
              <td id="time-tonextday">{dateConverter(getTimeToNextDay)}</td>
            </tr>
          </tbody>
        </table>
        <section>
          <h4>Win Price</h4>
          <p className="subtitle" id="token-price">
            {tokenPrice} BUSD
          </p>
          <img src="img/icon-busd.png" alt="Icon with busd gold logo" />
        </section>
        <div className="machine-input">
          <p>
            {" "}
            You will get{" "}
            <span id="sell-calc">
              {tokenToSell &&
                calculateBUSDToReceiveOnSale(tokenToSell, tokenPrice)}{" "}
              BUSD
            </span>
          </p>
          <input
            type="number"
            name="stake-busd"
            placeholder="Enter Amount"
            id="input-3"
            value={tokenToSell}
            min="0"
            onChange={handleTokenToSell}
          />
          <button
            className="btn-gray"
            onClick={() => setTokenToSell(buddyTokenBalance)}
          >
            MAX
          </button>
          <button className="btn-gray" onClick={sellBuddyToken}>
            SELL
          </button>
        </div>
        <p className="info-wallet-balance">
          Wallet Balance:{" "}
          <span id="user-token-balance-2">{buddyTokenBalance}</span> Win
        </p>
        <img
          
          src="img/logo.png"
          alt="illustration of big piggy pooping busd coins"
        />
      </section>
    </React.Fragment>
  );
};

export default SellWin;
