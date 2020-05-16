import React from "react";
import { makeStyles } from "@material-ui/core/styles";
const useStyles = makeStyles((theme) => ({
  root: {
    margin: theme.spacing(0.5),
    padding: theme.spacing(0.5),
    display: "flex",
    flexWrap: "wrap",
    maxWidth: "70%",
  },
  label: {
    overflowWrap: "break-word",
    whiteSpace: "normal",
    backgroundColor: theme.palette.grey[200],
    padding: theme.spacing(2),
    borderRadius: theme.spacing(2.7),
    width: "100%",
  },
}));

const ChatBubble = (props) => {
  const classes = useStyles();
  const { label } = props;
  return (
    <div className={classes.root}>
      <div className={classes.label}>
        <span>{label}</span>
      </div>
    </div>
  );
};

export default ChatBubble;
