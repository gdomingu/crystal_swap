import React, { useEffect, useState } from "react";
import TextField from "@material-ui/core/TextField";
import { makeStyles } from "@material-ui/core/styles";
import Button from "../components/Button";
import * as Yup from "yup";
import axios from "axios";
import AxiosHelper from "../utils/AxiosHelper";
import { useFormik } from "formik";
import Alert from "@material-ui/lab/Alert";

const useStyles = makeStyles((theme) => ({
  root: {
    "& > *": {
      marginBottom: theme.spacing(1),
      marginTop: theme.spacing(1),
    },
  },
}));

const validationSchema = Yup.object({
  email: Yup.string("Enter your email")
    .email("Enter a valid email")
    .required("Email is required"),
  password: Yup.string("")
    .min(8, "Password must contain at least 8 characters")
    .required("Enter your password"),
});

const SigninForm = (props) => {
  const classes = useStyles();
  const [error, setError] = useState();
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: validationSchema,
    onSubmit: (values, actions) => {
      actions.setSubmitting(true);
      AxiosHelper();
      axios
        .post("/users/sign_in", { user: values })
        .then((resp) => {
          console.log(resp);
          props.handleSuccessfulAuth(resp.data);
        })
        .catch((err) => {
          if (err.response.data.error) {
            setError(err.response.data.error);
            return;
          }
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
    },
  });

  useEffect(() => {
    // Prevent state leak error
    return () => {};
  }, []);
  const change = (name, e) => {
    e.persist();
    formik.handleChange(e);
    formik.setFieldTouched(name, true, false);
  };
  return (
    <form
      className={classes.root}
      autoComplete="off"
      onSubmit={formik.handleSubmit}
    >
      {error && <Alert severity="error">{error}</Alert>}
      <TextField
        id="email"
        label="email"
        required
        variant="outlined"
        fullWidth
        helperText={formik.touched.email ? formik.errors.email : ""}
        error={formik.touched.email && Boolean(formik.errors.email)}
        value={formik.values.email}
        onChange={change.bind(null, "email")}
        autoComplete="email"
      />
      <TextField
        id="password"
        name="password"
        helperText={formik.touched.password ? formik.errors.password : ""}
        error={formik.touched.password && Boolean(formik.errors.password)}
        label="Password"
        fullWidth
        type="password"
        value={formik.values.password}
        onChange={change.bind(null, "password")}
        variant="outlined"
        autoComplete="current-password"
      />
      <Button
        variant="contained"
        color="primary"
        type="submit"
        disabled={!formik.isValid}
      >
        Login
      </Button>
    </form>
  );
};

export default SigninForm;
