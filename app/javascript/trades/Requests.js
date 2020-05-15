import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import axios from "axios";
import AxiosHelper from "../utils/AxiosHelper";
import Grid from "@material-ui/core/Grid";
import Container from "@material-ui/core/Container";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import TradeList from "./TradeList";

const useStyles = makeStyles((theme) => ({
  root: {
    height: "100%",
  },
  cardHeader: {
    borderBottom: `1px solid ${theme.palette.divider}`,
  },
}));

const Requests = () => {
  const [tradeReqs, setTradeReqs] = useState([]);
  const [tradeReq, setTradeReq] = useState();
  const classes = useStyles();

  const handleListItemClick = (id) => {
    AxiosHelper();
    axios.get(`/api/trade_requests/${id}`).then((resp) => {
      if (resp.status == 200) {
        setTradeReq(resp.data);
      }
    });
  };

  useEffect(() => {
    AxiosHelper();
    axios.get("/api/trade_requests").then((resp) => {
      if (resp.status == 200) {
        setTradeReqs(resp.data);
      }
    });
    return () => {};
  }, []);
  return (
    <Container fixed>
      <Grid container component="main" className={classes.root}>
        <Grid item xs={4} sm={4}>
          <Card className={classes.root} variant="outlined">
            <CardContent className={classes.cardHeader}>
              <Typography variant="subtitle1">Trade Requests</Typography>
            </CardContent>
            <TradeList
              tradeReqs={tradeReqs}
              handleClick={handleListItemClick}
              selectedReq={tradeReq}
            ></TradeList>
          </Card>
        </Grid>
        <Grid item xs={8} sm={8}>
          <Card className={classes.root} variant="outlined">
            {tradeReq && (
              <Grid container>
                <Grid item xs={7} sm={7}>
                  <CardContent>
                    <Typography variant="h3">{tradeReq.gift.name}</Typography>
                    <Typography variant="subtitle1">
                      Requested by: {tradeReq.requested_by}
                    </Typography>
                    <Typography variant="body1">
                      {tradeReq.message || "No message"}
                    </Typography>
                  </CardContent>
                </Grid>
                <Grid item xs={4} sm={4}>
                  <img
                    src={tradeReq.gift.images[0]}
                    style={{ width: "100%" }}
                  ></img>
                </Grid>
              </Grid>
            )}
          </Card>
        </Grid>
      </Grid>
    </Container>
  );
};

export default Requests;
