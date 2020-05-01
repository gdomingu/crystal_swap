import React, { useState, useEffect } from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import Landing from "../landing/Landing";
import axios from "axios";
import { UserContext } from "../context/UserContext";
import AxiosHelper from "../utils/AxiosHelper";
import Share from "../share/Share";

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
      })
      .catch((error) => console.log("api errors:", error));
  };

  useEffect(() => {
    loginStatus(setCurrentUser);
    return () => {};
  }, []);

  return (
    <UserContext.Provider value={currentUser}>
      <BrowserRouter>
        <Switch>
          <Route
            exact
            path="/"
            render={(props) => (
              <Landing
                {...props}
                handleSuccessfulAuth={handleSuccessfulAuth}
                handleLogout={handleLogout}
              />
            )}
          />
          <Route exact path="/share" component={Share} />
        </Switch>
      </BrowserRouter>
    </UserContext.Provider>
  );
};

export default App;
