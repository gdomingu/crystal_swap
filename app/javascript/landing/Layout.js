import React, { useState } from "react";
import IconButton from "@material-ui/core/IconButton";
import CssBaseline from "@material-ui/core/CssBaseline";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import TopNav from "../components/TopNav";

const useStyles = makeStyles((theme) => ({
  footer: {
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(6),
    marginTop: theme.spacing(2),
    textAlign: "center",
  },
}));

export default function Layout(props) {
  const classes = useStyles();
  return (
    <div>
      <CssBaseline />
      <TopNav />
      <main>{props.children}</main>
      {/* Footer */}
      <footer className={classes.footer}>
        <Typography variant="caption" gutterBottom>
          With our hearts we chisel quartz to reach love.
        </Typography>
      </footer>
      {/* End footer */}
    </div>
  );
}
