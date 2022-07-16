import React, { useEffect, useState } from 'react';
import Legend from './components/Legend/Legend';
import Loader from './components/Loader/Loader';
import Map from './components/UI/Map';
import Nav from './components/layout/Nav.js';
import './App.scss';
import GameMode from './components/GameMode/GameMode';
import PurchaseLandContract from './PurchaseLand.json';
import getWeb3 from './getWeb3';

const wait = (delay) => new Promise((resolve) => setTimeout(resolve, delay));

function App() {
  const [isLoading, setIsLoading] = useState(false);
  const [gameMode, setGameMode] = useState(null);
  const [userName, setUserName] = useState(null);
  const [blockchainWeb3, setBlockchainWeb3] = useState({});

  // useEffect(() => {
  //   let isApiSubscribed = true;
  //   if (isApiSubscribed) {
  //     (async () => {
  //       setIsLoading(true);
  //       await wait(3000);
  //       setIsLoading(false);
  //     })();
  //   }
  //   return () => {
  //     isApiSubscribed = false;
  //   };
  // }, [gameMode]);

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

      const ownersOfLands = await instance.methods.getOwners().call();
      //event receiver
      instance.events.LandBought(
        { fromBlock: 'latest' },
        function (error, results) {
          (async () => {
            const accounts = await web3.eth.getAccounts();
            instance.methods
              .getOwners()
              .call()
              .then((ownersOfLands) => {
                console.log(ownersOfLands);
                setBlockchainWeb3({
                  web3: web3,
                  contract: instance,
                  owners: ownersOfLands,
                  accounts,
                });
              });
          })();
        }
      );

      window.ethereum.on('accountsChanged', function (accounts) {
        setBlockchainWeb3({
          web3: web3,
          contract: instance,
          owners: ownersOfLands,
          accounts,
        });
      });

      setBlockchainWeb3({
        web3,
        accounts,
        contract: instance,
        owners: ownersOfLands,
      });
    })();
  }, []);

  useEffect(() => {
    if (blockchainWeb3.accounts && blockchainWeb3.contract) setIsLoading(false);
  }, [blockchainWeb3]);

  console.log(blockchainWeb3.accounts);
  return (
    <>
      {!gameMode && (
        <GameMode setGameMode={setGameMode} setUserName={setUserName} />
      )}
      {gameMode && (
        <div className="App">
          <Nav gameMode={gameMode} userName={userName} />
          <div className="home">
            {isLoading && <Loader />}

            {!isLoading && (
              <>
                <Legend />{' '}
                <Map
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
