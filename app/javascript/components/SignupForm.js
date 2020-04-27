import React from "react";
import TextField from "@material-ui/core/TextField";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";

const useStyles = makeStyles((theme) => ({
  root: {
    "& > *": {
      margin: theme.spacing(1),
    },
  },
}));

const SignupForm = (props) => {
  const classes = useStyles();
  const {
    values: { email, password, confirmPassword },
    errors,
    touched,
    handleChange,
    isValid,
    setFieldTouched,
  } = props;

  const change = (name, e) => {
    e.persist();
    handleChange(e);
    setFieldTouched(name, true, false);
  };
  return (
    <form
      className={classes.root}
      autoComplete="off"
      onSubmit={() => {
        alert("submitted");
      }}
    >
      <TextField
        id="email"
        label="email"
        required
        variant="outlined"
        fullWidth
        helperText={touched.email ? errors.email : ""}
        error={touched.email && Boolean(errors.email)}
        value={email}
        onChange={change.bind(null, "email")}
      />
      <TextField
        id="password"
        name="password"
        helperText={touched.password ? errors.password : ""}
        error={touched.password && Boolean(errors.password)}
        label="Password"
        fullWidth
        type="password"
        value={password}
        onChange={change.bind(null, "password")}
        variant="outlined"
      />
      <TextField
        id="confirmPassword"
        name="confirmPassword"
        helperText={touched.confirmPassword ? errors.confirmPassword : ""}
        error={touched.confirmPassword && Boolean(errors.confirmPassword)}
        label="Confirm Password"
        fullWidth
        type="password"
        value={confirmPassword}
        onChange={change.bind(null, "confirmPassword")}
        variant="outlined"
      />
      <Button
        variant="contained"
        color="primary"
        type="submit"
        disabled={!isValid}
      >
        Create
      </Button>
    </form>
  );
};

export default SignupForm;
