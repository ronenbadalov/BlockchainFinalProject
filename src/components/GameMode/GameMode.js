import React from "react";
import Card from "./Card";
import classes from "./GameMode.module.scss";
import walletImg from "../../assets/wallet.png";
import guestImg from "../../assets/happy-vacation.png";
const GameMode = (props) => {
  return (
    <div className={classes["GameMode"]}>
      <h1 className={classes["header"]}>
        Hello User and welcome to E&R.Ltd Decentralized®
      </h1>
      <h2 className={classes["header"]}>
        Please choose how you would like to play
      </h2>
      <div className={classes["cardContainer"]}>
        <Card
          imagePath={walletImg}
          cardText="Buyer/Seller"
          onClick={() => {
            const name = prompt("How should we call you?", "");
            props.setUserName(name);
            props.setGameMode("buyer");
            localStorage.setItem("gameMode", "buyer");
            localStorage.setItem("name", name);
          }}
        />
        <Card
          imagePath={guestImg}
          cardText="Guest"
          onClick={() => {
            props.setGameMode("guest");
            localStorage.setItem("gameMode", "guest");
          }}
        />
      </div>
    </div>
  );
};

export default GameMode;
