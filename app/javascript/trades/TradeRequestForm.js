import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexWrap: "wrap",
    width: "100%",
    marginTop: theme.spacing(1),
  },
  textField: {
    marginBottom: theme.spacing(1),
  },
}));

const TradeRequestForm = () => {
  const [value, setValue] = useState("");
  const handleChange = (event) => {
    setValue(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault;
    console.log("Submitted", value);
  };

  const classes = useStyles();

  return (
    <div>
      <Grid container>
        <Grid item>
          <form onSubmit={handleSubmit} className={classes.root}>
            <TextField
              id="standard-multiline-static"
              label="Write a message"
              defaultValue="I'm interested in trading!"
              multiline
              rows={4}
              onChange={handleChange}
              variant="outlined"
              fullWidth
              className={classes.textField}
            />
            <Button variant="contained" color="primary" type="submit">
              Request
            </Button>
          </form>
        </Grid>
      </Grid>
    </div>
  );
};

export default TradeRequestForm;
