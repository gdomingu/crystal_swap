import React from "react";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";

const Request = (props) => {
  const { tradeReq } = props;
  return (
    <Grid container>
      <Grid item>
        <img src={tradeReq.gift.images[0]} style={{ maxHeight: "300px" }}></img>
        <CardContent>
          <Typography variant="h3">{tradeReq.gift.name}</Typography>
          <Typography variant="subtitle1">
            Requested by: {tradeReq.requested_by.email}
          </Typography>
        </CardContent>
      </Grid>
    </Grid>
  );
};

export default Request;
