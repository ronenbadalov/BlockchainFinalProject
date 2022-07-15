import React, { useEffect, useState } from "react";
import Legend from "./components/Legend/Legend";
import Loader from "./components/Loader/Loader";
import Map from "./components/UI/Map";
import Nav from "./components/layout/Nav.js";
import "./App.scss";
import GameMode from "./components/GameMode/GameMode";

const wait = (delay) => new Promise((resolve) => setTimeout(resolve, delay));

function App() {
  const [isLoading, setIsLoading] = useState(false);
  const [gameMode, setGameMode] = useState(null);
  const [userName, setUserName] = useState(null);

  useEffect(() => {
    let isApiSubscribed = true;
    if (isApiSubscribed) {
      (async () => {
        setIsLoading(true);
        await wait(3000);
        setIsLoading(false);
      })();
    }
    return () => {
      isApiSubscribed = false;
    };
  }, [gameMode]);
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
                <Legend /> <Map gameMode={gameMode} />
              </>
            )}
          </div>
        </div>
      )}
    </>
  );
}

export default App;
