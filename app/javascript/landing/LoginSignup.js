import React, { useState } from "react";
import SimpleDialog from "../components/SimpleDialog";
import Grid from "@material-ui/core/Grid";
import SignupForm from "../components/SignupForm";
import Button from "@material-ui/core/Button";

const LoginSignup = (props) => {
  const [open, setOpen] = useState(false);
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Grid container spacing={2} justify="center">
      <Grid item>
        <Button variant="contained" color="primary" onClick={handleClickOpen}>
          Login
        </Button>
      </Grid>
      <Grid item>
        <Button variant="outlined" color="primary" onClick={handleClickOpen}>
          Sign Up
        </Button>
        <SimpleDialog open={open} onClose={handleClose} title="Create Account">
          <SignupForm handleSuccessfulAuth={props.handleSuccessfulAuth} />
        </SimpleDialog>
      </Grid>
    </Grid>
  );
};

export default LoginSignup;
