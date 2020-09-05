import React, { useState, useEffect, useMemo } from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import Landing from "../landing/Landing";
import Layout from "../landing/Layout";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import { createMuiTheme, ThemeProvider } from "@material-ui/core/styles";

import axios from "axios";
import { UserContext } from "../context/UserContext";
import Share from "../gift/Share";
import Show from "../gift/Show";
import Edit from "../gift/Edit";
import Requests from "../trades/Requests";
import Direct from "../trades/Direct";
import Profile from "../components/Profile";

import { Redirect } from "react-router-dom";
import { deepPurple } from "@material-ui/core/colors";
import { connect } from "react-redux";

const App = (props) => {
  const [currentUser, setCurrentUser] = useState(null);
  const prefersDarkMode = useMediaQuery("(prefers-color-scheme: dark)");
  const { dispatch } = props;

  const loginStatus = () => {
    axios
      .get("/signed_in")
      .then((response) => {
        if (response.data.user) {
          let action = { type: "LOGGED_IN", user: response.data.user };
          dispatch(action);
        } else {
        }
      })
      .catch((error) => console.log("api errors:", error));
  };

  const theme = useMemo(
    () =>
      createMuiTheme({
        background: "linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)",
        palette: {
          primary: deepPurple,
          type: prefersDarkMode ? "dark" : "light",
        },
      }),
    [prefersDarkMode]
  );

  useEffect(() => {
    loginStatus();
    return () => {};
  }, []);

  return (
    <ThemeProvider theme={theme}>
      <UserContext.Provider value={currentUser}>
        <BrowserRouter>
          <Layout>
            <Switch>
              <Route
                exact
                path="/"
                render={(props) => <Landing {...props} />}
              />
              <Route exact path="/share" component={Share} />
              <Route exact path="/gifts/:id" component={Show} />
              <Route exact path="/gifts/:id/edit" component={Edit} />
              <Route exact path="/requests" component={Requests} />
              <Route exact path="/direct/:id" component={Direct} />
              <Route exact path="/profile" component={Profile} />
            </Switch>
          </Layout>
        </BrowserRouter>
      </UserContext.Provider>
    </ThemeProvider>
  );
};

export default connect()(App);
