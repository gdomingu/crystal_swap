import React, { useState } from "react";
import { Formik } from "formik";
import SimpleDialog from "../components/SimpleDialog";
import Grid from "@material-ui/core/Grid";
import SignupForm from "../components/SignupForm";
import Button from "@material-ui/core/Button";
import * as Yup from "yup";
import axios from "axios";
import AxiosHelper from "../utils/AxiosHelper";

const LoginSignup = () => {
  const [open, setOpen] = useState(false);
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = (value) => {
    setOpen(false);
  };
  const validationSchema = Yup.object({
    email: Yup.string("Enter your email")
      .email("Enter a valid email")
      .required("Email is required"),
    password: Yup.string("")
      .min(8, "Password must contain at least 8 characters")
      .required("Enter your password"),
    password_confirmation: Yup.string("Enter your password")
      .required("Confirm your password")
      .oneOf([Yup.ref("password")], "Password does not match"),
  });

  return (
    <Grid container spacing={2} justify="center">
      <Grid item>
        <Button variant="contained" color="primary" onClick={handleClickOpen}>
          Login
        </Button>
        <SimpleDialog open={open} onClose={handleClose} title="Create Account">
          <Formik
            initialValues={{
              email: "",
              password: "",
              password_confirmation: "",
            }}
            validationSchema={validationSchema}
            onSubmit={(values, actions) => {
              actions.setSubmitting(true);
              AxiosHelper();
              axios
                .post("/users", { user: values })
                .then((resp) => {
                  console.log("logged in!");
                })
                .catch((err) => {
                  if (err.response.data.errors["email"]) {
                    actions.setFieldTouched("email", true, false);
                    actions.setFieldError(
                      "email",
                      err.response.data.errors["email"][0],
                      false
                    );
                  }
                })
                .finally(() => actions.setSubmitting(false));
            }}
          >
            {(props) => <SignupForm {...props} />}
          </Formik>
        </SimpleDialog>
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
