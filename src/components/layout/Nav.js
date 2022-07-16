import React from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import { createTheme, ThemeProvider, Link } from "@mui/material";
// import { Link } from "react-router-dom";
import classes from "./Nav.module.scss";
const Nav = (props) => {
  const darkTheme = createTheme({
    palette: {
      mode: "dark",
      primary: {
        main: "#262626",
      },
    },
  });
  return (
    <>
      <ThemeProvider theme={darkTheme}>
        <AppBar position="static">
          <Toolbar>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              <Link
                sx={{ color: "white", textDecoration: "none" }}
                className={classes["link"]}
                href="/"
              >
                E&R.Ltd
              </Link>
            </Typography>
            <Typography variant="p" component="div" sx={{ margin: "0 1rem" }}>
              {`Hi ${props.gameMode === "guest" ? "Guest" : ""} ${
                props.gameMode === "buyer" && props.userName
                  ? props.userName
                  : "Anonymous"
              }`}
            </Typography>
          </Toolbar>
        </AppBar>
      </ThemeProvider>
    </>
  );
};

export default Nav;
