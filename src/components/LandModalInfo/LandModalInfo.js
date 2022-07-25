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
import classes from "./LandModalInfo.module.scss";
const LandModalInfo = ({
  landData,
  onClose,
  refreshMap,
  accounts,
  contract,
  gameMode,
  owners,
  handleGameModalOpen,
}) => {
  const [isMyLand, setIsMyLand] = useState(false);
  const [landOwner, setLandOwner] = useState("");
  const [price, setPrice] = useState("");
  const [forSale, setForSale] = useState(true);
  const [game, setGame] = useState({ name: "", url: "" });

  const sxClasses = {
    marginRight: "auto",
    maxWidth: "200px",
  };

  useEffect(() => {
    setPrice(landData.price);
    setForSale(landData.forSale);

    setGame({ name: landData.game, url: landData.gameUrl });
  }, [landData]);

  const formSubmitHandler = async (e) => {
    e.preventDefault();
  };

  const buyLandHandler = async () => {
    if (
      `${owners[landData.id]}`.toLowerCase() !==
      "0x0000000000000000000000000000000000000000"
    ) {
      await landData.contract.methods
        // .transferLand(accounts[0], owners[landData.id], landData.id)
        .transferLand(landData.id, owners[landData.id])
        .send({
          from: accounts[0],
          value: landData.price * 1000000000000000000,
        });
    } else {
      await landData.contract.methods
        .purchase(landData.id, landData.price)
        .send({
          from: accounts[0],
          value: landData.price * 1000000000000000000,
        });
    }

    refreshMap();
    onClose();
  };

  const isMyLandHandler = async () => {
    const idOfOwnerLand = await contract.methods.getOwner(landData.id).call();
    if (
      `${idOfOwnerLand}`.toLowerCase() === `${accounts[0]}`.toLowerCase() &&
      gameMode === "buyer"
    )
      setIsMyLand(true);
    else setIsMyLand(false);
  };

  // const isCurrentLandTaken = async () => {
  //   const owner = await landData.contract.methods.getOwner(landData.id).call();
  //   console.log(owner);
  //   if (owner === 0) return false;
  //   return true;
  // };

  const saveChangesHandler = async () => {
    await landData.contract.methods
      .saveChanged(landData.id, +price, !forSale, game?.name)
      .send({ from: accounts[0] });
    onClose();
    // await landData.contract.methods
    //   .setPrice(landData.id, +price)
    //   .send({ from: accounts[0] });
    // const sales = await contract.methods.test().call();
    // console.log(sales);
    // if (game.name === "Numble")
    //   gameUrl = "https://numble-ronen-badalov.netlify.app/";
    // if (game.name === "TicTacToe")
    //   gameUrl = "https://toytheater.com/tic-tac-toe/";
    // if (game.name === "Flappy Bird") gameUrl = "https://flappybird.io/";

    // map[row][col] = {
    //   ...landData,
    //   price,
    //   forSale,
    //   innerData: { name: game.name, url: gameUrl },
    // };
    // onClose();
  };

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
                value={price}
                onChange={(e) => {
                  setPrice(e.target.value);
                }}
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
                <Switch
                  checked={forSale}
                  onChange={(e) => {
                    setForSale(e.target.checked);
                  }}
                  disabled={!isMyLand}
                />
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
                value={game?.name ? game?.name : ""}
                onChange={(e) => {
                  setGame({ name: e.target.value });
                }}
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
                  value="Flappy Bird"
                  control={<Radio />}
                  label="Flappy Bird"
                />
              </RadioGroup>
            </FormControl>
          </div>
        </div>
        <div className={classes["btnSection"]}>
          <Button
            variant="contained"
            disabled={!game?.url}
            onClick={handleGameModalOpen}
          >
            Play Game!
          </Button>
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
