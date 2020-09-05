import React, { useState, useEffect } from "react";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import MailIcon from "@material-ui/icons/MailOutline";
import IconButton from "@material-ui/core/IconButton";
import HomeIcon from "@material-ui/icons/Home";
import { makeStyles } from "@material-ui/core/styles";
import Button from "../components/Button";
import SimpleDialog from "../components/SimpleDialog";
import Auth from "../components/Auth";
import { Link as RouterLink } from "react-router-dom";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import { useTheme } from "@material-ui/core/styles";
import { connect } from "react-redux";

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
  link: {
    textDecoration: "none",
    color: "white",
  },
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

const handleLogout = () => {};

const TopNav = (props) => {
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  useEffect(() => {
    setOpen(!!props.modalOpen);
  }, [props]);
  const button = () => {
    if (props.currentUser) {
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
            {props.currentUser.email}
          </RouterLink>
          <Button color="inherit" onClick={handleLogout}>
            Logout
          </Button>
        </>
      );
    }
    return (
      <Button color="inherit" onClick={() => setOpen(true)}>
        Login
      </Button>
    );
  };
  return (
    <AppBar position="relative" className={classes.root}>
      <Toolbar>
        <Typography
          variant="h6"
          color="inherit"
          noWrap
          className={classes.title}
          underline="none"
        >
          {homebutton()}
        </Typography>
        {button()}
        <SimpleDialog open={open} onClose={() => setOpen(false)}>
          <Auth />
        </SimpleDialog>
      </Toolbar>
    </AppBar>
  );
};

const mapStateToProps = (state) => {
  return state.current_user;
};

export default connect(mapStateToProps)(TopNav);
