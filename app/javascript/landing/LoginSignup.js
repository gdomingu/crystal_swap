import React, { useState } from "react";
import SimpleDialog from "../components/SimpleDialog";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";

const LoginSignup = () => {
  const [open, setOpen] = useState(false);
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = (value) => {
    setOpen(false);
  };
  return (
    <Grid container spacing={2} justify="center">
      <Grid item>
        <Button variant="contained" color="primary" onClick={handleClickOpen}>
          Login
        </Button>
        <SimpleDialog
          open={open}
          onClose={handleClose}
          title="Signup or login"
        />
      </Grid>
      <Grid item>
        <Button variant="outlined" color="primary">
          Sign Up
        </Button>
      </Grid>
    </Grid>
  );
};

export default LoginSignup;
