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
import Link from "@material-ui/core/Link";
import TradeRequestForm from "../trades/TradeRequestForm";
import { UserContext } from "../context/UserContext";
import SimpleDialog from "../components/SimpleDialog";
import SigninForm from "../components/SigninForm";

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
  const [openModal, setOpenModal] = useState(false);

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
  const handleClick = (e) => {
    e.preventDefault();
    setOpenModal(true);
  };
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
            <UserContext.Consumer>
              {(value) => {
                if (value) {
                  return <TradeRequestForm gift_id={id}></TradeRequestForm>;
                }
                return (
                  <>
                    <span>
                      <Link href="#" onClick={handleClick}>
                        Login
                      </Link>
                      {" to request a trade"}
                    </span>
                    <SimpleDialog
                      open={openModal}
                      onClose={() => {
                        setOpenModal(false);
                      }}
                      title="Login"
                    >
                      <SigninForm handleSuccessfulAuth={() => {}} />
                    </SimpleDialog>
                  </>
                );
              }}
            </UserContext.Consumer>
          </div>
        </Grid>
      </Grid>
    </Container>
  );
};

export default Show;
