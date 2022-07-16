import React, { useEffect, useState } from 'react';
import Legend from './components/Legend/Legend';
import Loader from './components/Loader/Loader';
import Map from './components/UI/Map';
import Nav from './components/layout/Nav.js';
import './App.scss';

import PurchaseLandContract from './PurchaseLand.json';
import getWeb3 from './getWeb3';

// const wait = (delay) => new Promise((resolve) => setTimeout(resolve, delay));

function App() {
  const [isLoading, setIsLoading] = useState(false);
  const [blockchainWeb3, setBlockchainWeb3] = useState({});

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
        deployedNetwork && deployedNetwork.address,
        { from: accounts[0] }
      );

      //event receiver
      instance.events.LandBought(
        { fromBlock: 'latest' },
        function (error, results) {
          console.log(results, error);
        }
      );

      const ownersOfLands = await instance.methods.getOwners().call();
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
      setIsLoading(false);
    })();
  }, []);

  // useEffect(() => {
  //   if (blockchainWeb3.accounts && blockchainWeb3.contract) setIsLoading(false);
  // }, [blockchainWeb3]);

  console.log(blockchainWeb3);
  return (
    <div className="App">
      <Nav />
      <div className="home">
        {isLoading && <Loader />}

        {!isLoading && (
          <>
            <Legend />{' '}
            <Map
              owners={blockchainWeb3.owners}
              accounts={blockchainWeb3.accounts}
              contract={blockchainWeb3.contract}
            />
          </>
        )}
      </div>
    </div>
  );
}

export default App;
