import React, { useState } from "react";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import Button from "../components/Button";
import axios from "axios";
import AxiosHelper from "../utils/AxiosHelper";

const Request = (props) => {
  const { tradeReq } = props;
  const [givenAt, setGivenAt] = useState(tradeReq.gift.given_at);

  const handleClick = () => {
    AxiosHelper();
    axios
      .patch(`/api/gifts/${tradeReq.gift.id}`, { gift: { given: !givenAt } })
      .then((resp) => {
        if (resp.status == 200) {
          setGivenAt(resp.data.given_at);
        }
      });
  };

  const buttonText = () => {
    if (givenAt) {
      return "Mark as available";
    } else {
      return "Mark as unavailable";
    }
  };

  const givenInfo = () => {
    console.log(givenAt);
    if (givenAt) {
      return <Typography variant="subtitle1">Given at: {givenAt}</Typography>;
    }
  };
  return (
    <Grid container>
      <Grid item>
        <img
          src={tradeReq.gift.images[0]}
          style={{ maxHeight: "300px", maxWidth: "100%" }}
        ></img>
        <CardContent>
          <Typography variant="h3">{tradeReq.gift.name}</Typography>
          <Typography variant="subtitle1">
            Requested by: {tradeReq.requested_by.email}
          </Typography>
          {givenInfo()}
          <Button onClick={handleClick} variant="contained" color="primary">
            {buttonText()}
          </Button>
        </CardContent>
      </Grid>
    </Grid>
  );
};

export default Request;
