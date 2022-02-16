import React from "react";

const trimAddress = (address) => {
  const firstpart = address.slice(0, 4);
  const midpart = "....";
  const endpart = address.slice(address.length - 4, address.length);
  return `${firstpart}${midpart}${endpart}`;
};

const Navbar = ({ connect, disconnect, provider, web3Provider, address }) => {
  return (
    <React.Fragment>
      <header>
        <nav id="pc">
          <ul>
            <li>
              {" "}
              <a href="#">
                <img
                  className="logo"
                  src="img/logo.png"
                  alt="Icon with Win in gold coin"
                />
              </a>
            </li>

            <li>
              {" "}
              <a
                href="https://thewintoken.com/"
                target="_blank"
                className="btn-gold"
              >
                Main Site
              </a>
            </li>

            <li>
              {" "}
              <a
                href="https://bscscan.com/address/0x892e571B4B993CC4327e34a15527b26C254871D2"
                target="_blank"
                className="btn-gold"
              >
                Contract
              </a>
            </li>

            {web3Provider ? (
              <li onClick={disconnect}>
                <a className="btn-gray" id="connect-btn1">
                  {trimAddress(address)}
                </a>
              </li>
            ) : (
              <li>
                <a className="btn-gold" id="connect-btn1" onClick={connect}>
                  Connect Wallet
                </a>
              </li>
            )}
          </ul>
        </nav>
        <nav id="mobile">
          <div id="toggle-bar">
            <a href="#">
              <img
                className="logo-mobile"
                src="img/logo.png"
                alt="Icon with piggy in gold coin"
              />
            </a>
            <a className="navicon mtoggle" href="#"></a>
          </div>
          <ul id="mmenu">
            <li>
              {" "}
              <a
                href="https://thewintoken.com/"
                target="_blank"
                className="btn-gold"
              >
                Main Site
              </a>
            </li>

            <li>
              {" "}
              <a
                href="https://bscscan.com/address/0x892e571b4b993cc4327e34a15527b26c254871d2"
                target="_blank"
                className="btn-gold"
              >
                Contract
              </a>
            </li>

            {web3Provider ? (
              <li onClick={disconnect}>
                <a className="btn-gray" id="connect-btn1">
                  {trimAddress(address)}
                </a>
              </li>
            ) : (
              <li>
                <a className="btn-gold" id="connect-btn1" onClick={connect}>
                  Connect Wallet
                </a>
              </li>
            )}
          </ul>
        </nav>
      </header>
    </React.Fragment>
  );
};

export default Navbar;
