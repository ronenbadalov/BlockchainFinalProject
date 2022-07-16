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
} from '@mui/material';
import React, { useContext, useState } from 'react';
// import { updateLand } from "../../helpers/landHelper";
// import CurUserContext from "../../store/curUser-context";
import classes from './LandModalInfo.module.scss';
const LandModalInfo = ({ landData, onClose }) => {
  // const curUserCtx = useContext(CurUserContext);
  const [isMyLand, setIsMyLand] = useState(
    // curUserCtx.user.id === landData.owner
    false
  );
  const sxClasses = {
    marginRight: 'auto',
    maxWidth: '200px',
  };

  const formSubmitHandler = async (e) => {
    e.preventDefault();
    // if (curUserCtx.user.balance < landData.price) {
    //   alert("You don't have enough money to buy this land");
    //   return;
    // }
    // const res = await updateLand(landData.id, {
    //   isOcupied: curUserCtx.user.id,
    // });
    // console.log(res);
  };

  const buyLandHandler = async () => {
    const isTaken = await isCurrentLandTaken();
    console.log(isTaken);
    if (!isTaken) {
      await landData.contract.methods
        .purchase(landData.id, landData.price)
        .send({
          value: landData.price * 1000000000000000000,
        });
    }
  };

  const isCurrentLandTaken = async () => {
    const owner = await landData.contract.methods.getOwner(landData.id).call();
    if (owner == 0) return false;
    return true;
  };
  return (
    <div>
      <h3>Land {landData.id}</h3>
      <form onSubmit={formSubmitHandler}>
        <div className={classes['formContainer']}>
          <div className={classes['formSection']}>
            <TextField
              id="standard-basic"
              label="Owner"
              variant="standard"
              disabled={true}
              value={landData.owner ? landData.owner : 'none'}
              sx={{ ...sxClasses }}
            />
            <FormControl sx={{ marginTop: 2, ...sxClasses }}>
              <InputLabel htmlFor="landPrice">Price</InputLabel>
              <Input
                id="landPrice"
                value={landData.price}
                // onChange={handleChange('amount')}
                startAdornment={
                  <InputAdornment position="start">$</InputAdornment>
                }
                disabled={!isMyLand}
                label="Price"
              />
            </FormControl>
          </div>
          <div className={classes['formSection']}>
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
        <div className={classes['btnSection']}>
          <Button variant="contained">Play Game!</Button>
          <Button
            variant="contained"
            disabled={!landData.forSale}
            type="submit"
            onClick={buyLandHandler}
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
