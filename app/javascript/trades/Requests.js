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
import Request from "./Request";
import Chat from "./Chat";

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
        <Grid item xs={12} sm={4}>
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
        {tradeReq && (
          <>
            <Grid item xs={false} sm={4} md={4}>
              <Card className={classes.chatCard} variant="outlined">
                <Chat tradeReq={tradeReq} />
              </Card>
            </Grid>
            <Grid item xs={false} sm={4} md={4}>
              <Card className={classes.root} variant="outlined">
                {tradeReq && <Request tradeReq={tradeReq} />}
              </Card>
            </Grid>
          </>
        )}
      </Grid>
    </Container>
  );
};

export default Requests;
