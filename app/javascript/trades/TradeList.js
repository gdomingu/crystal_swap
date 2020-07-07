import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import Avatar from "@material-ui/core/Avatar";
import Divider from "@material-ui/core/Divider";
import { formatDistance } from "date-fns";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import { useTheme } from "@material-ui/core/styles";
import { useHistory } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    height: "100%",
    backgroundColor: theme.palette.background.paper,
    paddingTop: "0",
    overflow: "auto",
  },
}));
const formatDate = (date) => {
  return formatDistance(new Date(date), new Date(), { addSuffix: true });
};

const TradeList = (props) => {
  const classes = useStyles();
  const theme = useTheme();
  const xsmallScreen = useMediaQuery(theme.breakpoints.down("xs"));
  let history = useHistory();

  const handleClick = (id) => {
    if (xsmallScreen) {
      return history.push(`/direct/${id}`);
    }
    return props.handleClick(id);
  };
  const { tradeReqs, selectedReq } = props;
  return (
    <div className={classes.root}>
      <List>
        {tradeReqs.map((req) => (
          <div key={req.id}>
            <ListItem
              button
              onClick={() => handleClick(req.id)}
              selected={selectedReq && selectedReq.id == req.id}
            >
              <ListItemAvatar>
                <Avatar alt="crystal image" src={req.gift.images[0]} />
              </ListItemAvatar>
              <ListItemText
                primary={req.gift.name}
                secondary={`requested ${formatDate(req.created_at)}`}
              />
            </ListItem>
            <Divider />
          </div>
        ))}
      </List>
    </div>
  );
};

export default TradeList;
