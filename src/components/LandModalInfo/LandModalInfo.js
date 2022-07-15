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
import React, { useState } from "react";
import classes from "./LandModalInfo.module.scss";
const LandModalInfo = ({ landData, onClose }) => {
  const [isMyLand, setIsMyLand] = useState(false);
  const sxClasses = {
    marginRight: "auto",
    maxWidth: "200px",
  };

  const formSubmitHandler = async (e) => {
    e.preventDefault();
  };
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
              value={landData.owner ? landData.owner : "none"}
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
          <Button
            variant="contained"
            disabled={!landData.forSale}
            type="submit"
          >
            Buy
          </Button>
          <Button variant="contained" onClick={onClose}>
            Close
          </Button>
        </div>
      </form>
    </div>
  );
};

export default LandModalInfo;
