import React from "react";
import TextField from "@material-ui/core/TextField";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Alert from "@material-ui/lab/Alert";
import * as Yup from "yup";
import axios from "axios";
import AxiosHelper from "../utils/AxiosHelper";
import { useFormik } from "formik";

const useStyles = makeStyles((theme) => ({
  root: {
    "& > *": {
      marginBottom: theme.spacing(1),
      marginTop: theme.spacing(1),
    },
  },
}));

const validationSchema = Yup.object({
  name: Yup.string("Enter name").required("Name of crystal is required"),
});

const GiftForm = (props) => {
  const classes = useStyles();

  const formik = useFormik({
    initialValues: {
      name: "",
      description: "",
    },
    validationSchema: validationSchema,
    onSubmit: (values, actions) => {
      actions.setSubmitting(true);
      AxiosHelper();
      axios
        .post("/gifts", { gift: values })
        .then((resp) => {
          console.log(resp);
        })
        .catch((err) => {
          actions.setFieldError("general", err.response.data.error);
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
      {formik.errors.general && (
        <Alert severity="error">{formik.errors.general}</Alert>
      )}
      <TextField
        id="name"
        label="name"
        required
        variant="outlined"
        fullWidth
        helperText={formik.touched.name ? formik.errors.name : ""}
        error={formik.touched.name && Boolean(formik.errors.name)}
        value={formik.values.name}
        onChange={change.bind(null, "name")}
      />
      <TextField
        id="description"
        name="description"
        helperText={formik.touched.description ? formik.errors.description : ""}
        error={formik.touched.description && Boolean(formik.errors.description)}
        label="description"
        fullWidth
        type="description"
        value={formik.values.description}
        onChange={change.bind(null, "description")}
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

export default GiftForm;
