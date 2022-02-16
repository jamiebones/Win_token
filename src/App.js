import { useEffect, useState, useCallback } from "react";
import { ethers, providers } from "ethers";
import Web3Modal from "web3modal";
import WalletConnectProvider from "@walletconnect/web3-provider";
import WalletLink from "walletlink";
import { useWallet } from "./walletContext";

import ABI from "./utils/abi.json";
import BSCABI from "./utils/busd.json";

//components
import Navbar from "./components/Navbar";
import WinStats from "./components/WinStats";
import ClaimAirDrop from "./components/ClaimAirDrop";
import StakeBusd from "./components/StakeBusd";
import StakeWin from "./components/StakeWin";
import SellWin from "./components/SellWin";
import Information from "./components/Information";

const INFURA_ID = "460f40a260564ac4a4f4b3fffb032dad";

const contractAddress = "0x892e571B4B993CC4327e34a15527b26C254871D2";
const addressZero = "0x0000000000000000000000000000000000000000";

const providerOptions = {
  walletconnect: {
    package: WalletConnectProvider, // required
    options: {
      infuraId: INFURA_ID, // required
    },
  },
  "custom-walletlink": {
    display: {
      logo: "https://play-lh.googleusercontent.com/PjoJoG27miSglVBXoXrxBSLveV6e3EeBPpNY55aiUUBM9Q1RCETKCOqdOkX2ZydqVf0",
      name: "Coinbase",
      description: "Connect to Coinbase Wallet (not Coinbase App)",
    },
    options: {
      appName: "Coinbase", // Your app name
      networkUrl: `https://mainnet.infura.io/v3/${INFURA_ID}`,
      chainId: 1,
    },
    package: WalletLink,
    connector: async (_, options) => {
      const { appName, networkUrl, chainId } = options;
      const walletLink = new WalletLink({
        appName,
      });
      const provider = walletLink.makeWeb3Provider(networkUrl, chainId);
      await provider.enable();
      return provider;
    },
  },
};

let web3Modal;
if (typeof window !== "undefined") {
  web3Modal = new Web3Modal({
    network: "mainnet", // optional
    cacheProvider: true,
    providerOptions, // required
  });
}

function App() {
  const { account, setAccountDetails } = useWallet();
  const { provider, address, signer, web3Provider, network } = account;

  const connect = useCallback(async function () {
    const provider = await web3Modal.connect();
    const web3Provider = new providers.Web3Provider(provider);
    const signer = web3Provider.getSigner();
    const address = await signer.getAddress();
    const network = await web3Provider.getNetwork();
    const accountDetails = {
      provider,
      web3Provider,
      signer,
      address,
      network,
    };
    setAccountDetails(accountDetails);
  }, []);

  const disconnect = useCallback(
    async function () {
      await web3Modal.clearCachedProvider();
      if (provider?.disconnect && typeof provider.disconnect === "function") {
        await provider.disconnect();
      }
      //reset the state here
      const accountDetails = {
        provider: null,
        web3Provider: null,
        signer: null,
        address: null,
        network: null,
      };
      setAccountDetails(accountDetails);
    },
    [provider]
  );

  // Auto connect to the cached provider
  useEffect(() => {
    if (web3Modal.cachedProvider) {
      connect();
    }
  }, [connect]);

  useEffect(() => {
    if (provider?.on) {
      const handleAccountsChanged = (accounts) => {
        // eslint-disable-next-line no-console
        console.log("accountsChanged", accounts);
        setAccountDetails({
          ...account,
          address: accounts[0],
        });
      };

      const handleChainChanged = (_hexChainId) => {
        window.location.reload();
      };

      const handleDisconnect = (error) => {
        console.log("disconnect", error);
        disconnect();
      };

      provider.on("accountsChanged", handleAccountsChanged);
      provider.on("chainChanged", handleChainChanged);
      provider.on("disconnect", handleDisconnect);

      // Subscription Cleanup
      return () => {
        if (provider.removeListener) {
          provider.removeListener("accountsChanged", handleAccountsChanged);
          provider.removeListener("chainChanged", handleChainChanged);
          provider.removeListener("disconnect", handleDisconnect);
        }
      };
    }
  }, [provider, disconnect]);

  //application code starts here
  const bscAddress = "0xe9e7CEA3DedcA5984780Bafc599bD69ADd087D56";
  const url = "https://bsc-dataseed.binance.org/";
  const customHttpProvider = new ethers.providers.JsonRpcProvider(url);

  //state of the application
  const [totalSupply, setTotalSupply] = useState("0.0000");
  const [circulatingSupply, setCirculatingSupply] = useState("0.0000");
  const [availableSupply, setAvailableSupply] = useState("0.0000");
  const [connectedAddress, setConnectedAddress] = useState("");
  const [bscBalance, setBscBalance] = useState("0.0000");
  const [buddyTokenBalance, setbuddytokenBalance] = useState("0.0000");

  const [bscApprovedAmount, setBscApprovedAmount] = useState("0.00");
  const [bscStakeText, setBscStateText] = useState("0");

  const [mybuddyStake, setMybuddyStake] = useState("0");
  const [totalbuddyStake, setTotalbuddyStake] = useState("0");

  const [userBscStaked, setUserBUSDStaked] = useState("0");
  const [totalBscStaked, setTotalBscStaked] = useState("0");

  const [tokenPrice, setTokenPrice] = useState("0");
  const [totalStakedToken, setTotalStakedToken] = useState("0");

  const [userUnclaimedToken, setUserUnclaimedToken] = useState("0");
  const [userUnclaimTokenMinting, setUserUnclaimTokenMinting] = useState("0");

  const [tokenToStake, setTokenToStake] = useState("0");

  const [totalSoldToday, setTodaySoldToday] = useState("0");

  const [totalAvailableToSell, setTodayAvailableToSellToday] = useState("0");

  const [getTimeToNextDay, setTimeToNextDay] = useState("0");

  const [buddyToSell, setbuddyToSell] = useState("0");

  const [contractBUSDBalance, setContractBUSDBalance] = useState("0");
  const [totalUsers, setTotalUsers] = useState("0");
  const [userTokenBalance, setUserTokenBalance] = useState("0");

  const [referralWithdrawn, setReferralWithdraw] = useState("0");
  const [referralTotalBonus, setReferralTotalBonus] = useState("0");
  const [referralBonus, setReferralBonus] = useState("0");
  const [totalReferral, setTotalReferrals] = useState("0");

  const [referralAddress, setReferralAddress] = useState(null);
  const [apyMinted, setApyMinted] = useState("0");
  const [apyStaked, setApyStaked] = useState("0");
  const [availableForAirDrop, setAvailableForAirDrop] = useState("0");

  const [timeToNextAirDrop, setTimeToNextAirDrop] = useState("0");

  async function loadDetails() {
    //const provider = new ethers.providers.JsonRpcProvider(url);
    const contract = new ethers.Contract(contractAddress, ABI, web3Provider);
    const bscContract = new ethers.Contract(bscAddress, BSCABI, web3Provider);
    //get the balance of OINT token

    let [
      buddybalance,
      bscBalance,
      total,
      availableSupply,
      supply,
      mybuddyStake,
      userBscBal,
      userBscStaked,
      userTokenBalance,
      tokenPrice,
      totalStakedToken,
      userUnclaimedToken,
      userUnclaimTokenMinting,
      totalSoldToday,
      totalAvailableToSell,
      getTimeToNextDay,
      contractBUSDBalance,

      referralWithdrawn,
      referralTotalBonus,
      referralBonus,
      totalUsers,
      totalReferral,
      apyMinted,
      apyStaked,
      availableForAirDrop,
      timeToNextAirDrop,
    ] = await Promise.all([
      contract.getUserTokenBalance(address),
      bscContract.balanceOf(address),
      contract.totalSupply(),
      contract.availableSupply(),
      contract.limitSupply(),
      contract.getUserTokenStaked(address),
      contract.getUserBUSDBalance(address),
      contract.getUserBUSDStaked(address),
      contract.getUserTokenBalance(address),
      contract.getTokenPrice(),
      contract.totalTokenStaked(),
      contract.getUserUnclaimedTokens_T(address),
      contract.getUserUnclaimedTokens_M(address),
      contract.getTokenSoldToday(),
      contract.getTokenAvailableToSell(),
      contract.getTimeToNextDay(),
      contract.getContractBUSDBalance(),
      contract.getUserReferralWithdrawn(address),
      contract.getUserReferralTotalBonus(address),
      contract.getUserReferralBonus(address),
      contract.totalUsers(),
      contract.getUserDownlineCount(address),
      contract.getAPY_M(),
      contract.getAPY_T(),
      contract.getUserBonAirdrop(address),
      contract.getUserTimeToNextAirdrop(address),
    ]);

    //parse the values here
    buddybalance = parseFloat(ethers.utils.formatEther(buddybalance)).toFixed(
      8
    );
    bscBalance = parseFloat(ethers.utils.formatEther(bscBalance)).toFixed(8);
    total = parseFloat(ethers.utils.formatEther(total)).toFixed(8);
    availableSupply = parseFloat(
      ethers.utils.formatEther(availableSupply)
    ).toFixed(8);
    supply = parseFloat(ethers.utils.formatEther(supply)).toFixed(8);
    mybuddyStake = parseFloat(ethers.utils.formatEther(mybuddyStake)).toFixed(
      8
    );
    userBscBal = parseFloat(ethers.utils.formatEther(userBscBal)).toFixed(8);
    userBscStaked = parseFloat(ethers.utils.formatEther(userBscStaked)).toFixed(
      8
    );
    userTokenBalance = parseFloat(
      ethers.utils.formatEther(userTokenBalance)
    ).toFixed(8);
    tokenPrice = ethers.utils.formatUnits(tokenPrice, "18");
    totalStakedToken = parseFloat(
      ethers.utils.formatEther(totalStakedToken)
    ).toFixed(8);
    userUnclaimedToken = parseFloat(
      ethers.utils.formatEther(userUnclaimedToken)
    ).toFixed(8);
    userUnclaimTokenMinting = parseFloat(
      ethers.utils.formatEther(userUnclaimTokenMinting)
    ).toFixed(8);
    totalSoldToday = parseFloat(
      ethers.utils.formatEther(totalSoldToday)
    ).toFixed(8);
    totalAvailableToSell = parseFloat(
      ethers.utils.formatEther(totalAvailableToSell)
    ).toFixed(8);

    referralWithdrawn = parseFloat(
      ethers.utils.formatEther(referralWithdrawn)
    ).toFixed(8);
    referralTotalBonus = parseFloat(
      ethers.utils.formatEther(referralTotalBonus)
    ).toFixed(8);
    referralBonus = parseFloat(ethers.utils.formatEther(referralBonus)).toFixed(
      8
    );
    availableForAirDrop = parseFloat(
      ethers.utils.formatEther(availableForAirDrop)
    ).toFixed(8);

    getTimeToNextDay = getTimeToNextDay.toString();
    totalUsers = totalUsers.toString();

    contractBUSDBalance = parseFloat(
      ethers.utils.formatEther(contractBUSDBalance)
    ).toFixed(8);
    apyMinted = apyMinted.toString();
    apyStaked = apyStaked.toString();

    timeToNextAirDrop = timeToNextAirDrop.toString();

    setTotalSupply(total);
    setCirculatingSupply(supply);
    setAvailableSupply(availableSupply);
    setBscBalance(bscBalance);
    setbuddytokenBalance(buddybalance);
    setMybuddyStake(mybuddyStake);
    setTokenPrice(tokenPrice);
    setTotalStakedToken(totalStakedToken);
    setUserUnclaimedToken(userUnclaimedToken);
    setUserUnclaimTokenMinting(userUnclaimTokenMinting);
    setTodaySoldToday(totalSoldToday);
    setTodayAvailableToSellToday(totalAvailableToSell);
    setTimeToNextDay(getTimeToNextDay);
    setUserTokenBalance(userTokenBalance);
    setUserBUSDStaked(userBscStaked);
    setContractBUSDBalance(contractBUSDBalance);

    setReferralWithdraw(referralWithdrawn);
    setReferralTotalBonus(referralTotalBonus);
    setReferralBonus(referralBonus);
    setTotalUsers(totalUsers);
    setTotalReferrals(totalReferral.toString());
    setApyMinted(apyMinted);
    setApyStaked(apyStaked);
    setAvailableForAirDrop(availableForAirDrop);
    setTimeToNextAirDrop(timeToNextAirDrop);
  }

  useEffect(() => {
    if (web3Provider) {
      loadDetails();
    }
  }, [web3Provider]);

  useEffect(() => {
    const queryParams = new URLSearchParams(window.location.search);
    const referral = queryParams.get("ref");
    if (referral) {
      setReferralAddress(referral);
    }
  }, []);

  return (
    <div className="App">
      <Navbar
        connect={connect}
        disconnect={disconnect}
        provider={provider}
        web3Provider={web3Provider}
        address={address}
      />
      <main>
        <WinStats
          tokenPrice={tokenPrice}
          circulatingSupply={circulatingSupply}
          availableSupply={availableSupply}
          totalSupply={totalSupply}
        />

        <section id="machine">
          <h2 className="sr-only">Machine</h2>
          <StakeBusd
            account={account}
            contractAddress={contractAddress}
            userBscStaked={userBscStaked}
            contractBUSDBalance={contractBUSDBalance}
            userUnclaimTokenMinting={userUnclaimTokenMinting}
            bscBalance={bscBalance}
            referralAddress={referralAddress}
            apyMinted={apyMinted}
          />
          <StakeWin
            mybuddyStake={mybuddyStake}
            account={account}
            totalStakedToken={totalStakedToken}
            userUnclaimTokenStake={userUnclaimedToken}
            contractAddress={contractAddress}
            userTokenBalance={userTokenBalance}
            apyStaked={apyStaked}
            buddybalance={buddyTokenBalance}
          />
          <SellWin
            account={account}
            contractAddress={contractAddress}
            getTimeToNextDay={getTimeToNextDay}
            tokenPrice={tokenPrice}
            buddyTokenBalance={buddyTokenBalance}
            totalAvailableToSell={totalAvailableToSell}
            totalSoldToday={totalSoldToday}
          />
        </section>
        <Information
          account={account}
          contractAddress={contractAddress}
          referralWithdrawn={referralWithdrawn}
          referralTotalBonus={referralTotalBonus}
          referralBonus={referralBonus}
          totalReferral={totalReferral}
        />

        <ClaimAirDrop
          account={account}
          contractAddress={contractAddress}
          availableForAirDrop={availableForAirDrop}
          userBscStaked={userBscStaked}
          totalReferral={totalReferral}
          timeToNextAirDrop={timeToNextAirDrop}
        />
      </main>
    </div>
  );
}

export default App;
