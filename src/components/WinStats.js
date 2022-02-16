import React from "react";

const WinStats = ({
  tokenPrice,
  circulatingSupply,
  availableSupply,
  totalSupply,
}) => {
  return (
    <React.Fragment>
      <section id="piggy-bank-machine">
        <h1>Win Token</h1>

        <p className="subtitle">
          Use BUSD to earn Win token to stake and sell for BUSD.
        </p>

        <section>
          <h2 className="sr-only">WIN Token information</h2>
          <div className="piggy-stats">
            <img
              src="img/icon-piggy-coin.png"
              alt="Icon with piggy in gold coin"
            />
            <h2>WIN Token Price</h2>
            <h3>
              <span id="token-priceM">{tokenPrice}</span> BUSD
            </h3>
          </div>
        </section>
        <span className="effect-linebreak"></span>
        <section>
          <h2 className="sr-only">Supply information</h2>
          <div className="piggy-stats">
            <img src="img/icon-stock.png" alt="Icon with busd stock image" />
            <h2>Total supply</h2>
            <h3>
              <span id="limit-supply">{totalSupply}</span>
            </h3>
            <span id="graph-supply-total"></span>
          </div>
          <div className="piggy-stats">
            <img src="img/icon-busd.png" alt="Icon with busd gold logo" />
            <h2>Circulating supply</h2>
            <h3>
              <span id="total-supply">{circulatingSupply}</span>
            </h3>
            <span id="graph-supply-circulating"></span>
          </div>
          <div className="piggy-stats">
            <img src="img/icon-check.png" alt="Icon with checked image" />
            <h2>Available supply</h2>
            <h3>
              <span id="available-supply">{availableSupply}</span>
            </h3>
            <span id="graph-supply-available"></span>
          </div>
        </section>
      </section>
    </React.Fragment>
  );
};

export default WinStats;
