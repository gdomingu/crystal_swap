import React from "react";
import TextField from "@material-ui/core/TextField";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import * as Yup from "yup";
import axios from "axios";
import AxiosHelper from "../utils/AxiosHelper";
import { useFormik } from "formik";

const useStyles = makeStyles((theme) => ({
  root: {
    "& > *": {
      margin: theme.spacing(1),
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
  password_confirmation: Yup.string("Enter your password")
    .required("Confirm your password")
    .oneOf([Yup.ref("password")], "Password does not match"),
});

const SignupForm = (props) => {
  const classes = useStyles();

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
      password_confirmation: "",
    },
    validationSchema: validationSchema,
    onSubmit: (values, actions) => {
      actions.setSubmitting(true);
      AxiosHelper();
      axios
        .post("/users", { user: values })
        .then((resp) => {
          console.log(resp);
          props.handleSuccessfulAuth(resp.data);
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
    },
  });

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
      />
      <TextField
        id="password_confirmation"
        name="password_confirmation"
        helperText={
          formik.touched.password_confirmation
            ? formik.errors.password_confirmation
            : ""
        }
        error={
          formik.touched.password_confirmation &&
          Boolean(formik.errors.password_confirmation)
        }
        label="Confirm Password"
        fullWidth
        type="password"
        value={formik.password_confirmation}
        onChange={change.bind(null, "password_confirmation")}
        variant="outlined"
      />
      <Button
        variant="contained"
        color="primary"
        type="submit"
        disabled={!formik.isValid}
      >
        Create
      </Button>
    </form>
  );
};

export default SignupForm;
