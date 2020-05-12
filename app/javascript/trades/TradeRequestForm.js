import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import Alert from "@material-ui/lab/Alert";
import axios from "axios";
import AxiosHelper from "../utils/AxiosHelper";

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

const defaultValue = "I'm interested in trading!";

const TradeRequestForm = (props) => {
  const [value, setValue] = useState(defaultValue);
  const [requested, setRequested] = useState(false);
  const { gift_id } = props;
  const handleChange = (event) => {
    setValue(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    AxiosHelper();
    axios
      .post(`/api/gifts/${gift_id}/trade_requests`, {
        gift_request: { message: value },
      })
      .then((resp) => {
        if (resp.status == 200) {
          setRequested(true);
        }
      });
  };

  const classes = useStyles();

  if (requested) {
    return <Alert severity="success">Successfully requested a trade!</Alert>;
  }
  return (
    <div>
      <Grid container>
        <Grid item>
          <form onSubmit={handleSubmit} className={classes.root}>
            <TextField
              id="standard-multiline-static"
              label="Write a message"
              defaultValue={defaultValue}
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
