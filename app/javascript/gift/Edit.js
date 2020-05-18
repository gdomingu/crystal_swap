import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import AxiosHelper from "../utils/AxiosHelper";
import axios from "axios";
import GiftCard from "../gift/GiftCard";
import GiftForm from "../gift/GiftForm";
import Spinner from "../components/Spinner";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import Container from "@material-ui/core/Container";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: "center",
    color: theme.palette.text.secondary,
  },
}));

const Edit = () => {
  const [gift, setGift] = useState();
  let { id } = useParams();
  const classes = useStyles();
  const onSuccess = (resp) => {
    setGift(resp.data);
  };
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
    <Container fixed>
      <Grid container spacing={3}>
        <Grid item xs={6}>
          <GiftCard gift={gift}></GiftCard>
        </Grid>
        <Grid item xs={6}>
          <Paper className={classes.paper}>
            <GiftForm
              gift={gift}
              url={`/api/gifts/${gift.id}`}
              method="patch"
              buttonLabel="Update"
              onSuccess={onSuccess}
            ></GiftForm>
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
};

export default Edit;
