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
    height: "80vh",
  },
  cardHeader: {
    borderBottom: `1px solid ${theme.palette.divider}`,
  },
}));

const Requests = () => {
  const [tradeReqs, setTradeReqs] = useState([]);
  const classes = useStyles();

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
            <CardContent>
              <TradeList tradeReqs={tradeReqs}></TradeList>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={8} sm={8}>
          <Card className={classes.root} variant="outlined">
            <CardContent></CardContent>
          </Card>
        </Grid>
      </Grid>
    </Container>
  );
};

export default Requests;
