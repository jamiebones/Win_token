import React from "react";
import { ethers } from "ethers";
import ABI from "../utils/abi.json";

const ClaimAirDrop = ({
  account: { web3Provider, signer, address },
  contractAddress,
  availableForAirDrop,
  userBscStaked,
  totalReferral,
  timeToNextAirDrop,
}) => {
  const splitAndAdd = (string) => {
    let splitString = string.split(",");
    let total = +splitString[0] + +splitString[1] + +splitString[2];
    return total;
  };

  const claimAirDrop = async () => {
    try {
      const contract = new ethers.Contract(contractAddress, ABI, web3Provider);
      await contract.connect(signer).claimAirdrop();
      alert("Airdrop claimed");
    } catch (error) {
      alert(`There was an error : ${error.message}`);
    }
  };

  return (
    <React.Fragment>
      <section id="claim-airdrop">
        <h2>Claim airdrop</h2>
        <p className="subtitle">
          Complete the challenges to get airdrop. You can receive 100 Piggies
          every 7 days.
        </p>
        <section className="claim-section">
          <h4>Available for Airdrop</h4>
          <p id="available-airdrop">{availableForAirDrop}</p>
          <a className="btn-gold" id="claimA">
            Claim
          </a>
        </section>
        <div id="airdrop-c-1">
          <div className="effect-gold-borders challenge">
            <h3>Challenge 1</h3>
            <p>Have at least 100.00 BUSDT in Stake</p>
          </div>
          <span>
            <br />{" "}
            {userBscStaked > 100 ? (
              <>&#9989; completed</>
            ) : (
              <>❌ &nbsp; you have not completed this challenge </>
            )}
          </span>
        </div>
        <div id="airdrop-c-2">
          <div className="effect-gold-borders challenge">
            <h3>Challenge 2</h3>
            <p>7 days since the last claim</p>
          </div>
          <span>
            <br /> <>❌ &nbsp; you have not completed this challenge </>
          </span>
        </div>
        <div id="airdrop-c-3">
          <div className="effect-gold-borders challenge">
            <h3>Challenge 3</h3>
            <p>Have 5 more referrals (from level 1)</p>
          </div>
          <span>
            <br />{" "}
            {splitAndAdd(totalReferral) > 5 ? (
              <>&#9989;</>
            ) : (
              <>❌ &nbsp; you have not completed this challenge </>
            )}
          </span>
        </div>
      </section>
    </React.Fragment>
  );
};

export default ClaimAirDrop;
