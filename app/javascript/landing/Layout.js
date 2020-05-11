import React, { useState } from "react";
import AppBar from "@material-ui/core/AppBar";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import CssBaseline from "@material-ui/core/CssBaseline";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import SimpleDialog from "../components/SimpleDialog";
import SigninForm from "../components/SigninForm";
import Copyright from "../components/Copyright";

import { UserContext } from "../context/UserContext";
import Link from "@material-ui/core/Toolbar";
import { Link as RouterLink } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  icon: {
    marginRight: theme.spacing(2),
  },
  root: {
    flexGrow: 1,
    marginBottom: theme.spacing(3),
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
  },
}));

export default function Layout(props) {
  const [open, setOpen] = useState(false);
  const classes = useStyles();
  return (
    <div>
      <CssBaseline />
      <AppBar position="relative" className={classes.root}>
        <Toolbar>
          <IconButton
            edge="start"
            className={classes.menuButton}
            color="inherit"
            aria-label="menu"
          >
            <MenuIcon />
          </IconButton>
          <Typography
            variant="h6"
            color="inherit"
            noWrap
            className={classes.title}
            underline="none"
          >
            <Button to="/" color="inherit" component={RouterLink}>
              Crystal Swap
            </Button>
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
                <Button color="inherit" onClick={props.handleLogout}>
                  Logout
                </Button>
              );
            }}
          </UserContext.Consumer>
        </Toolbar>
      </AppBar>
      <main>{props.children}</main>
      {/* Footer */}
      <footer className={classes.footer}>
        <Typography variant="h6" align="center" gutterBottom>
          Crystal Swap
        </Typography>
      </footer>
      {/* End footer */}
    </div>
  );
}
