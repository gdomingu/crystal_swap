import React, { useState, useEffect, useMemo } from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import Landing from "../landing/Landing";
import Layout from "../landing/Layout";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import { createMuiTheme, ThemeProvider } from "@material-ui/core/styles";

import axios from "axios";
import { UserContext } from "../context/UserContext";
import AxiosHelper from "../utils/AxiosHelper";
import Share from "../gift/Share";
import Show from "../gift/Show";
import Edit from "../gift/Edit";
import Requests from "../trades/Requests";
import Direct from "../trades/Direct";

import { Redirect } from "react-router-dom";
import { deepPurple } from "@material-ui/core/colors";

const loginStatus = (setCurrentUser) => {
  axios
    .get("/signed_in")
    .then((response) => {
      if (response.data.user) {
        setCurrentUser(response.data.user);
      } else {
        setCurrentUser(null);
      }
    })
    .catch((error) => console.log("api errors:", error));
};

const App = () => {
  const [currentUser, setCurrentUser] = useState(null);
  const prefersDarkMode = useMediaQuery("(prefers-color-scheme: dark)");

  const handleSuccessfulAuth = (user) => {
    console.log("logged in!");
    setCurrentUser(user);
  };

  const handleLogout = () => {
    AxiosHelper();
    axios
      .delete("/users/sign_out")
      .then(() => {
        setCurrentUser(null);
        <Redirect to="/" />;
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
    loginStatus(setCurrentUser);
    return () => {};
  }, []);

  return (
    <ThemeProvider theme={theme}>
      <UserContext.Provider value={currentUser}>
        <BrowserRouter>
          <Layout
            handleLogout={handleLogout}
            handleSuccessfulAuth={handleSuccessfulAuth}
          >
            <Switch>
              <Route
                exact
                path="/"
                render={(props) => (
                  <Landing
                    {...props}
                    handleSuccessfulAuth={handleSuccessfulAuth}
                  />
                )}
              />
              <Route exact path="/share" component={Share} />
              <Route exact path="/gifts/:id" component={Show} />
              <Route exact path="/gifts/:id/edit" component={Edit} />
              <Route exact path="/requests" component={Requests} />
              <Route exact path="/direct/:id" component={Direct} />
            </Switch>
          </Layout>
        </BrowserRouter>
      </UserContext.Provider>
    </ThemeProvider>
  );
};

export default App;
