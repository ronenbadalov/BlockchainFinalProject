import React from "react";
import classes from "./Card.module.scss";
const Card = (props) => {
  return (
    <div className={classes["card"]} onClick={props.onClick}>
      <img
        className={classes["img"]}
        alt={props.cardText}
        src={props.imagePath}
      />
      <p className={classes["p"]}>{props.cardText}</p>
    </div>
  );
};

export default Card;
