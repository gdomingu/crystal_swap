import React, { useState, useEffect } from "react";
import SimpleDialog from "../components/SimpleDialog";
import Grid from "@material-ui/core/Grid";
import SignupForm from "../components/SignupForm";
import SigninForm from "../components/SigninForm";
import Button from "@material-ui/core/Button";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Auth from "../components/Auth";
import { connect } from "react-redux";

const LoginSignup = (props) => {
  const [open, setOpen] = useState(false);
  const [dialogType, setDialogType] = useState("");
  const handleClickOpen = (name) => {
    setDialogType(name);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  useEffect(() => {
    console.log(props);
    setOpen(!!props.modalOpen);
  }, [props]);
  return (
    <Grid container spacing={2} justify="center">
      <Grid item>
        <Button
          variant="contained"
          color="primary"
          onClick={() => handleClickOpen("login")}
        >
          Login
        </Button>
      </Grid>
      <Grid item>
        <Button
          variant="outlined"
          color="primary"
          onClick={() => handleClickOpen("signup")}
        >
          Sign Up
        </Button>
        <SimpleDialog open={open} onClose={handleClose}>
          <Auth dialogType={dialogType} />;
        </SimpleDialog>
      </Grid>
    </Grid>
  );
};
const mapStateToProps = (state) => {
  return state.current_user;
};

export default connect(mapStateToProps)(LoginSignup);
