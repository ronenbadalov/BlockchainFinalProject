import React from "react";
import Lottie from "lottie-react";
import loadingBitcoin from "../../lottie/loadingBitcoin.json";
import classes from "./Loader.module.scss";
const Loader = () => {
  return (
    <div className={classes["container"]}>
      <Lottie
        animationData={loadingBitcoin}
        loop={true}
        style={{ width: "300px" }}
      />
      <h3>Please wait while we build the map</h3>
    </div>
  );
};

export default Loader;
