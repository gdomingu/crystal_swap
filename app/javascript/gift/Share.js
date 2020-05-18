import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Container from "@material-ui/core/Container";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import GiftForm from "./GiftForm";

const useStyles = makeStyles({
  root: {
    maxWidth: 600,
  },
});
const Share = () => {
  const classes = useStyles();

  return (
    <Container maxWidth="sm">
      <Card className={classes.root}>
        <CardContent>
          <Typography gutterBottom variant="h5" component="h2">
            Share a crystal
          </Typography>
          <GiftForm url="api/gifts" buttonLabel="Create"></GiftForm>
        </CardContent>
      </Card>
    </Container>
  );
};

export default Share;
