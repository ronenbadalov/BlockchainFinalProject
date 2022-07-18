import {
  Button,
  FormControl,
  FormControlLabel,
  FormLabel,
  Input,
  InputAdornment,
  InputLabel,
  Radio,
  RadioGroup,
  Switch,
  TextField,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import GameMode from "../GameMode/GameMode";
import classes from "./LandModalInfo.module.scss";
const LandModalInfo = ({
  landData,
  onClose,
  refreshMap,
  accounts,
  contract,
  gameMode,
  owners,
}) => {
  const [isMyLand, setIsMyLand] = useState(false);

  const sxClasses = {
    marginRight: "auto",
    maxWidth: "200px",
  };

  const formSubmitHandler = async (e) => {
    e.preventDefault();
  };

  const buyLandHandler = async () => {
    const isTaken = await isCurrentLandTaken();
    if (!isTaken) {
      await landData.contract.methods
        .purchase(landData.id, landData.price)
        .send({
          from: accounts[0],
          value: landData.price * 1000000000000000000,
        });
      refreshMap();
      onClose();
    }
  };

  const isMyLandHandler = async () => {
    const idOfOwnerLand = await contract.methods.getOwner(landData.id).call();
    // landData.owner = `${idOfOwnerLand}`;
    if (idOfOwnerLand == accounts[0] && gameMode === "buyer") setIsMyLand(true);
    else setIsMyLand(false);
  };

  const isCurrentLandTaken = async () => {
    const owner = await landData.contract.methods.getOwner(landData.id).call();
    if (owner == 0) return false;
    return true;
  };

  const saveChangesHandler = () => {};

  useEffect(() => {
    (async () => {
      await isMyLandHandler();
    })();
  }, []);

  return (
    <div>
      <h3>Land {landData.id}</h3>
      <form onSubmit={formSubmitHandler}>
        <div className={classes["formContainer"]}>
          <div className={classes["formSection"]}>
            <TextField
              id="standard-basic"
              label="Owner"
              variant="standard"
              disabled={true}
              value={
                `${owners[landData.id]}`.toLowerCase() !==
                "0x0000000000000000000000000000000000000000"
                  ? `${owners[landData.id]}`.toLowerCase()
                  : "none"
              }
              sx={{ ...sxClasses }}
            />
            <FormControl sx={{ marginTop: 2, ...sxClasses }}>
              <InputLabel htmlFor="landPrice">Price</InputLabel>
              <Input
                id="landPrice"
                value={landData.price}
                endAdornment={
                  <InputAdornment position="end">ETH</InputAdornment>
                }
                disabled={!isMyLand}
                label="Price"
              />
            </FormControl>
          </div>
          <div className={classes["formSection"]}>
            <FormControlLabel
              control={
                <Switch checked={landData.forSale} disabled={!isMyLand} />
              }
              label="For Sale"
              labelPlacement="start"
              sx={{ ...sxClasses }}
            />
            <FormControl disabled={!isMyLand}>
              <FormLabel id="demo-row-radio-buttons-group-label">
                Game
              </FormLabel>
              <RadioGroup
                row
                aria-labelledby="demo-row-radio-buttons-group-label"
                name="row-radio-buttons-group"
              >
                <FormControlLabel
                  value="Numble"
                  control={<Radio />}
                  label="Numble"
                />
                <FormControlLabel
                  value="TicTacToe"
                  control={<Radio />}
                  label="TicTacToe"
                />
                <FormControlLabel
                  value="Game3"
                  control={<Radio />}
                  label="Game3"
                />
              </RadioGroup>
            </FormControl>
          </div>
        </div>
        <div className={classes["btnSection"]}>
          <Button variant="contained">Play Game!</Button>
          {!isMyLand && (
            <Button
              variant="contained"
              disabled={gameMode === "guest" || !landData.forSale}
              type="submit"
              onClick={buyLandHandler}
            >
              Buy
            </Button>
          )}
          {isMyLand && (
            <Button
              variant="contained"
              type="submit"
              onClick={saveChangesHandler}
            >
              Save Changes
            </Button>
          )}
          <Button variant="contained" onClick={onClose}>
            Close
          </Button>
        </div>
      </form>
    </div>
  );
};

export default LandModalInfo;
