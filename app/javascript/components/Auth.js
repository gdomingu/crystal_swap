import React, { useState, useEffect } from "react";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import { makeStyles } from "@material-ui/core/styles";
import Box from "@material-ui/core/Box";
// import { connect } from "react-redux";

import SignupForm from "./SignupForm";
import SigninForm from "./SigninForm";
// import { useTranslation } from "react-i18next";

const TabPanel = (props) => {
  const { children, value, index } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
    >
      {value === index && <Box p={3}>{children}</Box>}
    </div>
  );
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

const Auth = (props) => {
  const [value, setValue] = React.useState(0);
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  // const { t } = useTranslation();
  useEffect(() => {
    setValue(props.dialogType == "signup" ? 1 : 0);
    return () => {};
  }, [props.dialogType]);
  return (
    <>
      <Tabs
        value={value}
        onChange={handleChange}
        aria-label="simple tabs example"
      >
        <Tab label={"Login"} {...a11yProps(0)} />
        <Tab label={"Sign up"} {...a11yProps(1)} />
      </Tabs>
      <TabPanel value={value} index={0}>
        <SigninForm></SigninForm>
      </TabPanel>
      <TabPanel value={value} index={1}>
        <SignupForm></SignupForm>
      </TabPanel>
    </>
  );
};

export default Auth;
