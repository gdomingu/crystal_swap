import React, { useState } from "react";
import TextField from "@material-ui/core/TextField";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Alert from "@material-ui/lab/Alert";
import * as Yup from "yup";
import axios from "axios";
import AxiosHelper from "../utils/AxiosHelper";
import { useFormik } from "formik";
import Switch from "@material-ui/core/Switch";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import { DropzoneArea } from "material-ui-dropzone";

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
  const [publishedGift, setpublishedGift] = useState(false);
  const [imagesData, setImagesData] = useState();
  const formik = useFormik({
    initialValues: {
      name: "",
      description: "",
      images: [],
    },
    validationSchema: validationSchema,
    onSubmit: (values, actions) => {
      actions.setSubmitting(true);
      let formData = new FormData();
      formData.append("gift[description]", values.description);
      formData.append("gift[name]", values.name);
      formData.append("gift[published]", publishedGift);
      imagesData.forEach((image) => {
        formData.append("gift[images][]", image);
      });
      console.log(formData);
      AxiosHelper();
      axios({
        method: "post",
        url: "api/gifts",
        data: formData,
        config: { headers: { "Content-Type": "multipart/form-data" } },
      })
        .then((resp) => {
          actions.setStatus("success");
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

  const handleSwitchChange = () => {
    setpublishedGift(!publishedGift);
    formik.setFieldValue("published", !publishedGift);
  };

  const handleImageUpload = (images) => {
    setImagesData(images);
  };

  return (
    <>
      <form
        className={classes.root}
        autoComplete="off"
        onSubmit={formik.handleSubmit}
      >
        {formik.errors.general && (
          <Alert severity="error">{formik.errors.general}</Alert>
        )}
        {formik.status && (
          <Alert severity="success">
            Successfully posted a crystal to share!
          </Alert>
        )}
        <DropzoneArea onChange={handleImageUpload} />
        <TextField
          id="name"
          label="name"
          name="name"
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
          helperText={
            formik.touched.description ? formik.errors.description : ""
          }
          error={
            formik.touched.description && Boolean(formik.errors.description)
          }
          label="description"
          fullWidth
          type="description"
          value={formik.values.description}
          onChange={change.bind(null, "description")}
          variant="outlined"
        />
        <FormControlLabel
          control={
            <Switch
              checked={publishedGift}
              onChange={handleSwitchChange}
              name="published"
              inputProps={{ "aria-label": "secondary checkbox" }}
            />
          }
          label={publishedGift ? "Unpublish" : "Publish"}
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
    </>
  );
};

export default GiftForm;
