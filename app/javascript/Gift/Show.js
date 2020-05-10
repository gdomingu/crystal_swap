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

const useStyles = makeStyles((theme) => ({
  root: {
    height: "100vh",
  },
  image: {
    backgroundImage: (props) => `url(${props.url})`,
    backgroundRepeat: "no-repeat",
    backgroundColor:
      theme.palette.type === "light"
        ? theme.palette.grey[50]
        : theme.palette.grey[900],
    backgroundSize: "cover",
    backgroundPosition: "center",
  },
  paper: {
    margin: theme.spacing(8, 4),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
}));

const Show = () => {
  const [gift, setGift] = useState();
  const classes = useStyles({ url: gift && gift.images[0] });

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
    <Grid container component="main" className={classes.root}>
      <CssBaseline />
      <Grid item xs={false} sm={4} md={7} className={classes.image} />
      <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
        <div className={classes.paper}>{gift.name}</div>
      </Grid>
    </Grid>
  );
};

export default Show;
