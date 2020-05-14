import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import Avatar from "@material-ui/core/Avatar";
import Divider from "@material-ui/core/Divider";
import { formatDistance } from "date-fns";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper,
  },
}));
const formatDate = (date) => {
  return formatDistance(new Date(date), new Date(), { addSuffix: true });
};

const TradeList = (props) => {
  const classes = useStyles();
  const { tradeReqs } = props;

  return (
    <List className={classes.root}>
      {tradeReqs.map((req) => (
        <div key={req.id}>
          <ListItem>
            <ListItemAvatar>
              <Avatar alt="crystal image" src={req.gift.images[0]} />
            </ListItemAvatar>
            <ListItemText
              primary={req.gift.name}
              secondary={formatDate(req.requested_at)}
            />
          </ListItem>
          <Divider />
        </div>
      ))}
    </List>
  );
};

export default TradeList;
