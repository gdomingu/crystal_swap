import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import AxiosHelper from "../utils/AxiosHelper";
import axios from "axios";
import CssBaseline from "@material-ui/core/CssBaseline";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Spinner from "../components/Spinner";
import Container from "@material-ui/core/Container";
import TradeRequestForm from "../trades/TradeRequestForm";

const useStyles = makeStyles((theme) => ({
  paper: {
    margin: theme.spacing(8, 4),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  image: {
    [theme.breakpoints.up("sm")]: {
      maxWidth: "50%",
    },
    [theme.breakpoints.down("sm")]: {
      maxWidth: "100%",
    },
  },
  details: {
    marginBottom: theme.spacing(3),
  },
}));

const Show = () => {
  const [gift, setGift] = useState();
  const classes = useStyles();

  let { id } = useParams();
  useEffect(() => {
    AxiosHelper();
    axios.get(`/api/gifts/${id}`).then((resp) => {
      setGift(resp.data);
    });
    return () => {};
  }, []);
  if (!gift) {
    return <Spinner />;
  }
  return (
    <Container>
      <Grid container component="main" className={classes.root}>
        <CssBaseline />
        <Grid item component={Paper} square>
          <div className={classes.paper}>
            <img src={gift && gift.images[0]} className={classes.image} />
            <div className={classes.details}>
              <Typography gutterBottom variant="h3" component="h3">
                {gift.name}
              </Typography>
              <Typography variant="body2" component="p">
                {gift.description}
              </Typography>
              <Typography variant="body2" color="textSecondary" component="p">
                Gifted by: {gift.gift_from.email}
              </Typography>
            </div>
            <TradeRequestForm gift_id={id}></TradeRequestForm>
          </div>
        </Grid>
      </Grid>
    </Container>
  );
};

export default Show;
