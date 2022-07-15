import logo from "./logo.svg";
import { useEffect, useState } from "react";
import "./App.css";

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
