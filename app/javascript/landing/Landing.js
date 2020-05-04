import React from "react";
import Hero from "./Hero";
import HomeGrid from "./HomeGrid";

const Landing = (props) => {
  return (
    <div>
      <Hero handleSuccessfulAuth={props.handleSuccessfulAuth} />
      <HomeGrid />
    </div>
  );
};

export default Landing;
