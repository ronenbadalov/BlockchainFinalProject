import React, { useCallback, useEffect, useState } from "react";
import Legend from "./components/Legend/Legend";
import Loader from "./components/Loader/Loader";
import Map from "./components/UI/Map";
import Nav from "./components/layout/Nav.js";
import "./App.scss";
import GameMode from "./components/GameMode/GameMode";
import PurchaseLandContract from "./PurchaseLand.json";
import getWeb3 from "./getWeb3";

const CONTRACT_ADDR = "0x9949A50Cf9af9C550A2A38617F81160547594C1c";
function App() {
  const [isLoading, setIsLoading] = useState(false);
  const [gameMode, setGameMode] = useState(null);
  const [userName, setUserName] = useState(null);
  const [landData, setLandData] = useState({
    prices: [],
    games: [],
    notForSale: [],
  });
  const [blockchainWeb3, setBlockchainWeb3] = useState({});
  console.log(landData);
  useEffect(() => {
    (async () => {
      setIsLoading(true);
      // await wait(3000);

      /* loading accounts, contracts and web3 library */
      const web3 = await getWeb3();
      const accounts = await web3.eth.getAccounts();
      const networkId = await web3.eth.net.getId();
      const deployedNetwork = PurchaseLandContract.networks[networkId];

      const instance = new web3.eth.Contract(
        PurchaseLandContract.abi,
        deployedNetwork && deployedNetwork.address
      );
      const instance2 = new web3.eth.Contract(
        PurchaseLandContract.abi,
        CONTRACT_ADDR
      );

      window.ethereum.on("accountsChanged", function (accounts) {
        (async () => {
          setIsLoading(true);
          const {
            0: games,
            1: notForSale,
            2: prices,
          } = await instance.methods.getLandsData().call();
          setLandData({ prices, notForSale, games });
          const ownersOfLands = await instance.methods.getOwners().call();
          setBlockchainWeb3({
            web3: web3,
            contract: instance,
            owners: ownersOfLands,
            accounts,
          });
          setIsLoading(false);
        })();
      });
      const ownersOfLands = await instance.methods.getOwners().call();
      console.log(ownersOfLands);
      //event receiver
      instance.events.LandBought(
        { fromBlock: "latest" },
        function (error, results) {
          (async () => {
            const accounts = await web3.eth.getAccounts();
            setIsLoading(true);
            const {
              0: games,
              1: notForSale,
              2: prices,
            } = await instance.methods.getLandsData().call();
            setLandData({ prices, notForSale, games });
            instance.methods
              .getOwners()
              .call()
              .then((ownersOfLands) => {
                setBlockchainWeb3({
                  web3: web3,
                  contract: instance,
                  owners: ownersOfLands,
                  accounts,
                });
              });
            setIsLoading(false);
          })();
        }
      );
      // console.log(instance.events.SaveChanges);

      instance.events.saveChangedEvent(
        { fromBlock: "latest" },
        function (error, results) {
          setIsLoading(true);
          (async () => {
            const {
              0: games,
              1: notForSale,
              2: prices,
            } = await instance.methods.getLandsData().call();
            setLandData({ prices, notForSale, games });
            setIsLoading(false);
          })();
        }
      );

      instance.events.LandTransfer(
        { fromBlock: "latest" },
        function (error, results) {
          setIsLoading(true);
          (async () => {
            const {
              0: games,
              1: notForSale,
              2: prices,
            } = await instance.methods.getLandsData().call();

            setLandData({ prices, notForSale, games });
            const ownersOfLands = await instance.methods.getOwners().call();
            setBlockchainWeb3({
              web3: web3,
              contract: instance,
              owners: ownersOfLands,
              accounts,
            });
            setIsLoading(false);
          })();
        }
      );

      const {
        0: games,
        1: notForSale,
        2: prices,
      } = await instance.methods.getLandsData().call();
      setLandData({ prices, notForSale, games });

      setBlockchainWeb3({
        web3,
        accounts,
        contract: instance,
        owners: ownersOfLands,
      });

      const gameModeStorage = localStorage.getItem("gameMode");
      if (gameModeStorage) setGameMode(gameModeStorage);
      if (gameModeStorage === "buyer")
        setUserName(localStorage.getItem("name"));
    })();
  }, []);

  useEffect(() => {
    setIsLoading(true);

    if (blockchainWeb3.accounts && blockchainWeb3.contract) setIsLoading(false);
  }, [blockchainWeb3]);

  const handleLogout = useCallback(() => {
    localStorage.removeItem("gameMode");
    localStorage.removeItem("name");
    setGameMode(null);
    setUserName(null);
  }, []);

  return (
    <>
      {isLoading && <Loader />}
      {!gameMode && !isLoading && (
        <GameMode setGameMode={setGameMode} setUserName={setUserName} />
      )}
      {gameMode && !isLoading && (
        <div className="App">
          <Nav
            gameMode={gameMode}
            userName={userName}
            handleLogout={handleLogout}
          />
          <div className="home">
            {isLoading && <Loader />}

            {!isLoading && (
              <>
                <Legend />
                <Map
                  landData={landData}
                  gameMode={gameMode}
                  owners={blockchainWeb3.owners}
                  accounts={blockchainWeb3.accounts}
                  contract={blockchainWeb3.contract}
                />
              </>
            )}
          </div>
        </div>
      )}
    </>
  );
}

export default App;
