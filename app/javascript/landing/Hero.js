import React from "react";
import Container from "@material-ui/core/Container";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import LoginSignup from "./LoginSignup";
import { UserContext } from "../context/UserContext";
import Button from "../components/Button";
import { Link } from "react-router-dom";
import Grid from "@material-ui/core/Grid";

const useStyles = makeStyles((theme) => ({
  heroContent: {
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(8, 0, 6),
  },
  heroButtons: {
    marginTop: theme.spacing(4),
  },
  betaSpan: {
    position: "relative",
  },
  betaImg: {
    width: "40px",
    position: theme.absolute,
    bottom: 0,
  },
}));

const Hero = (props) => {
  const classes = useStyles();
  return (
    <div className={classes.heroContent}>
      <Container maxWidth="sm">
        <Typography
          component="h1"
          variant="h2"
          align="center"
          color="textPrimary"
          gutterBottom
        >
          <span className={classes.betaSpan}>
            Crystal Swap
            <img
              className={classes.betaImg}
              src="https://media.discordapp.net/attachments/526567429363597345/753846949735694436/beta-logo-png-8.png"
            />
          </span>
        </Typography>
        <Typography variant="h5" align="center" color="textSecondary" paragraph>
          Find a new home for your beloved crystals
        </Typography>
        <UserContext.Consumer>
          {(value) => {
            if (value === null) {
              return (
                <div className={classes.heroButtons}>
                  <LoginSignup
                    handleSuccessfulAuth={props.handleSuccessfulAuth}
                  />
                </div>
              );
            } else {
              return (
                <Grid container spacing={1} justify="center">
                  <Grid item>
                    <Button
                      component={Link}
                      to="/share"
                      variant="contained"
                      color="primary"
                    >
                      Share a crystal
                    </Button>
                  </Grid>
                </Grid>
              );
            }
          }}
        </UserContext.Consumer>
      </Container>
    </div>
  );
};
export default Hero;
