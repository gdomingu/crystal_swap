import React from "react";
import Container from "@material-ui/core/Container";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import LoginSignup from "./LoginSignup";
import { UserContext } from "../context/UserContext";

const useStyles = makeStyles((theme) => ({
  heroContent: {
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(8, 0, 6),
  },
  heroButtons: {
    marginTop: theme.spacing(4),
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
          Crystal Swap
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
            }
          }}
        </UserContext.Consumer>
      </Container>
    </div>
  );
};
export default Hero;
