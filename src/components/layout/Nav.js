import React, { useContext } from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { createTheme, IconButton, ThemeProvider } from "@mui/material";
import { Link } from "react-router-dom";
import classes from "./Nav.module.scss";
import { userLogOut } from "../../helpers/userHelper";
import CurUserContext from "../../store/curUser-context";
import SettingsIcon from "@mui/icons-material/Settings";
import MUIModal from "../Modal/MUIModal";
import UserOptions from "../UserOptions/UserOptions";
import { useNavigate } from "react-router-dom";
import { auth } from "../../config/firebase";
import { useAuthState } from "react-firebase-hooks/auth";


const Nav = () => {
  const curUserCtx = useContext(CurUserContext);
  const [user, loading, error] = useAuthState(auth);
  const [showModal, setShowModal] = React.useState(false);
  const navigate = useNavigate();

  const darkTheme = createTheme({
    palette: {
      mode: "dark",
      primary: {
        main: "#262626",
      },
    },
  });

  const handleModalOpen = () => {
    setShowModal(true);
  };

  const handleModalClose = () => {
    setShowModal(false);
  };

  const handleLogout = () => {
    curUserCtx.logout();
    userLogOut();
    navigate("/login");
  };
  return (
    <>
      <ThemeProvider theme={darkTheme}>
        <AppBar position="static">
          <Toolbar>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              <Link className={classes["link"]} to="/">
                R&R.Ltd
              </Link>
            </Typography>
            <Typography variant="p" component="div" sx={{ margin: "0 1rem" }}>
              {`Hi ${
                curUserCtx.user
                  ? `${curUserCtx.user.name} ${`${
                      curUserCtx.user.isOwner
                        ? `| Balance: ${curUserCtx.user.balance}$`
                        : ""
                    }`}`
                  : "Guest"
              }`}
            </Typography>
            {curUserCtx.user ? (
              <IconButton
                component="span"
                sx={{ marginRight: "10px" }}
                onClick={handleModalOpen}
              >
                <SettingsIcon />
              </IconButton>
            ) : (
              ""
            )}
            {!curUserCtx.user && (
              <>
                <Button color="inherit">
                  <Link className={classes["link"]} to="/login">
                    Login
                  </Link>
                </Button>
                <Button color="inherit">
                  <Link className={classes["link"]} to="/signup">
                    Sign Up
                  </Link>
                </Button>
              </>
            )}
            {curUserCtx.user && (
              <Button color="inherit" onClick={handleLogout}>
                Logout
              </Button>
            )}
          </Toolbar>
        </AppBar>
      </ThemeProvider>
      <MUIModal
        // sx={{ width: "300px", margin: "0 auto" }}
        open={showModal}
        onClose={handleModalClose}
      >
        <UserOptions />
      </MUIModal>
    </>
  );
};

export default Nav;
