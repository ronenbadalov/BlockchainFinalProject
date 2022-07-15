import React, { useEffect, useState } from "react";
import Legend from "./components/Legend/Legend";
import Loader from "./components/Loader/Loader";
import Map from "./components/UI/Map";
import "./App.scss";

const wait = (delay) => new Promise((resolve) => setTimeout(resolve, delay));

function App() {
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    (async () => {
      setIsLoading(true);
      await wait(3000);
      setIsLoading(false);
    })();
  }, []);
  return (
    <div className="App">
      {isLoading && <Loader />}

      {!isLoading && (
        <>
          <Legend /> <Map />
        </>
      )}
    </div>
  );
}

export default App;
