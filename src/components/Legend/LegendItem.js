import React from "react";
import classes from "./Legend.module.scss";

const LegendItem = (props) => {
  return (
    <div className={`${classes["row"]} ${classes["landItem"]}`}>
      <div className={`${classes["boxColor"]} ${props.color}`}></div>
      {props.text}
    </div>
  );
};

export default LegendItem;
