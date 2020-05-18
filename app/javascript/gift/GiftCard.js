import React from "react";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  card: {
    height: "100%",
    display: "flex",
    flexDirection: "column",
  },
  cardMedia: {
    paddingTop: "56.25%", // 16:9
  },
  cardContent: {
    flexGrow: 1,
  },
}));

const GiftCard = (props) => {
  const { cardActions, gift } = props;
  const classes = useStyles();
  return (
    <div>
      <Card className={classes.card}>
        <CardMedia
          className={classes.cardMedia}
          image={gift.images[0]}
          title="Image title"
        />
        <CardContent className={classes.cardContent}>
          <Typography gutterBottom variant="h5" component="h2">
            {gift.name}
          </Typography>
          <Typography>{gift.description}</Typography>
        </CardContent>
        <CardActions>{cardActions}</CardActions>
      </Card>
    </div>
  );
};

export default GiftCard;
