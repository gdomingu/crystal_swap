import React, { useState } from "react";
import AppBar from "@material-ui/core/AppBar";
import IconButton from "@material-ui/core/IconButton";
import MailIcon from "@material-ui/icons/MailOutline";
import HomeIcon from "@material-ui/icons/Home";
import CssBaseline from "@material-ui/core/CssBaseline";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Button from "../components/Button";
import SimpleDialog from "../components/SimpleDialog";
import SigninForm from "../components/SigninForm";

import { UserContext } from "../context/UserContext";
import { Link as RouterLink } from "react-router-dom";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import { useTheme } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  icon: {
    marginRight: theme.spacing(2),
  },
  root: {
    flexGrow: 1,
    marginBottom: theme.spacing(3),
    background: theme.background,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
  footer: {
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(6),
    marginTop: theme.spacing(2),
    textAlign: "center",
  },
  link: {
    textDecoration: "none",
    color: "white",
  }
}));

const homebutton = () => {
  const theme = useTheme();

  const smallScreen = useMediaQuery(theme.breakpoints.down("sm"));

  if (smallScreen) {
    return (
      <IconButton
        color="inherit"
        aria-label="menu"
        component={RouterLink}
        to={"/"}
      >
        <HomeIcon />
      </IconButton>
    );
  }
  return (
    <Button to="/" color="inherit" component={RouterLink}>
      Crystal Swap
    </Button>
  );
};

export default function Layout(props) {
  const [open, setOpen] = useState(false);
  const classes = useStyles();
  return (
    <div>
      <CssBaseline />
      <AppBar position="relative" className={classes.root}>
        <Toolbar>
          {/* <IconButton
            edge="start"
            className={classes.menuButton}
            color="inherit"
            aria-label="menu"
          >
            <MenuIcon />
          </IconButton> */}
          <Typography
            variant="h6"
            color="inherit"
            noWrap
            className={classes.title}
            underline="none"
          >
            {homebutton()}
          </Typography>
          <UserContext.Consumer>
            {(value) => {
              if (value === null) {
                return (
                  <>
                    <SimpleDialog
                      open={open}
                      onClose={() => setOpen(false)}
                      title="Sign in"
                    >
                      <SigninForm
                        handleSuccessfulAuth={props.handleSuccessfulAuth}
                      ></SigninForm>
                    </SimpleDialog>
                    <Button color="inherit" onClick={() => setOpen(true)}>
                      Login
                    </Button>
                  </>
                );
              }
              return (
                <>
                  <IconButton
                    edge="start"
                    color="inherit"
                    aria-label="menu"
                    component={RouterLink}
                    to={"/requests"}
                  >
                    <MailIcon />
                  </IconButton>
                  <RouterLink className={classes.link} to="/profile">
                    {value.email}
                  </RouterLink>
                  <Button color="inherit" onClick={props.handleLogout}>
                    Logout
                  </Button>
                </>
              );
            }}
          </UserContext.Consumer>
        </Toolbar>
      </AppBar>
      <main>{props.children}</main>
      {/* Footer */}
      <footer className={classes.footer}>
        <Typography variant="caption" gutterBottom>
          With our hearts we chisel quartz to reach love.
        </Typography>
      </footer>
      {/* End footer */}
    </div>
  );
}
