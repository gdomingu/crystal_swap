import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Btn from "@material-ui/core/Button";

const colorMap = (color, theme) => {
  if (color == "primary") {
    return theme.background;
  }
  return color;
};

const useStyles = makeStyles((theme) => ({
  root: {
    background: (props) => colorMap(props.color, theme),
  },
}));

const Button = (props) => {
  const classes = useStyles(props);
  return (
    <Btn {...props} className={classes.root}>
      {props.children}
    </Btn>
  );
};

export default Button;
