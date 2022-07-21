import { Container } from "@mui/material";
import React from "react";
import classes from "./GameModal.module.scss";
const GameModal = ({ landData }) => {
  return (
    <Container className={classes["container"]}>
      <h3 className={classes["header"]}>
        {landData.innerData ? landData.innerData.name : "No Game"}
      </h3>
      {landData.innerData ? (
        <iframe className={classes["frame"]} src={landData.innerData.url} />
      ) : (
        ""
      )}
    </Container>
  );
};

export default GameModal;
