import React from "react";
import { ethers } from "ethers";
import ABI from "../utils/abi.json";

const Information = ({
  account: { web3Provider, signer, address },
  contractAddress,
  referralWithdrawn,
  referralTotalBonus,
  referralBonus,
  totalReferral,
}) => {
  const copyURL = (text) => {
    navigator.clipboard.writeText(text);
    alert("Referral link copied!");
  };

  const splitAndAdd = (string) => {
    let splitString = string.split(",");
    let total = +splitString[0] + +splitString[1] + +splitString[2];
    return total;
  };

  const withDrawBonus = async () => {
    try {
      const contract = new ethers.Contract(contractAddress, ABI, web3Provider);
      await contract.connect(signer).withdrawRef();
      alert("Bonus withdrawn");
    } catch (error) {
      alert(`There was an error : ${error.data.message}`);
    }
  };

  return (
    <React.Fragment>
      <section id="information">
        <h2>Information</h2>
        <p>
          Win Token - 0x892e571B4B993CC4327e34a15527b26C254871D2
          <br />
          <br />
          <br />
          <b>Process</b>
          <br />
          <br />
          1.1. Enter BUSD into the Win Project and earn daily staking rewards in
          WIn Tokens. You can claim your Win Token rewards at anytime. You
          cannot unstake your BUSD.
          <br />
          1.2. You will earn Win as a percentage of BUSD invested irrespective
          of the WIN Token Price.
          <br />
          <br />
          3. Terminology
          <br />
          3.1. Maximum Supply : The maximum amount of Win that can exist
          <br />
          3.2. Circulating Supply : The amount of Win that are currently in
          wallets.
          <br />
          3.3. Available Supply : (Maximum Supply - Circulating Supply)
          <br />
          3.4. WIN Price : (Total BUSD Balance / Available Supply) Mint Win - As
          you claim or harvest Win from minting or staking, it is removed from
          the Available Supply and added to the Circulating Supply
          <br />
          <br />
          4. Sell Win - As you sell Win, it is removed from the Circulating
          Supply and added to the Available Supply. DYOR! As this is the first
          one of these that we are deploying, there is always a risk of the
          uncertain. Only use funds you can afford to lose.
        </p>

        {/* <img
          src="img/illu-piggy-reading-info.png"
          alt="illustration of piggy reading information"
        />
         */}

        <section className="effect-gold-borders">
          <h3>Your referral link</h3>
          <div className="machine-input">
            <input
              type="text"
              name="referral-link"
              value="..."
              id="ref-link"
              readOnly
              value={`${window.location.host}?ref=${address}`}
            />
            <button
              className="btn-gray"
              onClick={() =>
                copyURL(`https://${window.location.host}?ref=${address}`)
              }
            >
              Copy
            </button>
          </div>
          <table>
            <tbody>
              <tr>
                <td>
                  <h4>Referral earned available</h4>
                </td>
                <td id="referral-available">{referralBonus}</td>
              </tr>
              <tr>
                <td>
                  <h4>Total Referral earned</h4>
                </td>
                <td id="referral-earned">{referralTotalBonus}</td>
              </tr>
              <tr>
                <td>
                  <h4>Total Referral Withdrawn</h4>
                </td>
                <td id="referral-withdrawn">{referralWithdrawn}</td>
              </tr>
              <tr>
                <td>
                  <h4>Total referrals</h4>
                </td>
                <td id="total-referrals">{splitAndAdd(totalReferral)}</td>
              </tr>
            </tbody>
          </table>
          <button
            id="withdraw-referral-btn"
            className="btn-gold"
            onClick={withDrawBonus}
          >
            Withdraw Refferal Earnings
          </button>
          <p>
            Earn $BUSD by inviting people to Win Token.
            <br />
            <br /> You will receive:
            <br />
            <br /> 10% from each level 1 referral deposits 8% from each level 2
            referral deposits 5% from each level 3 referral deposits <br />
            <br />
            Deposit at least once to activate Referral Rewards.
          </p>
          <img
            src="img/illu-coin-pile.png"
            alt="illustration of busd coin pile"
          />
        </section>
      </section>
    </React.Fragment>
  );
};

export default Information;
