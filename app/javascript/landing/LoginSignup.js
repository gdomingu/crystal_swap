import React, { useState } from "react";
import SimpleDialog from "../components/SimpleDialog";
import Grid from "@material-ui/core/Grid";
import SignupForm from "../components/SignupForm";
import SigninForm from "../components/SigninForm";
import Button from "@material-ui/core/Button";

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

  const dialog = () => {
    if (dialogType == "login") {
      return (
        <SimpleDialog open={open} onClose={handleClose} title="Login">
          <SigninForm handleSuccessfulAuth={props.handleSuccessfulAuth} />
        </SimpleDialog>
      );
    }
    return (
      <SimpleDialog open={open} onClose={handleClose} title="Create Account">
        <SignupForm handleSuccessfulAuth={props.handleSuccessfulAuth} />
      </SimpleDialog>
    );
  };

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
        {dialog()}
      </Grid>
    </Grid>
  );
};

export default LoginSignup;
