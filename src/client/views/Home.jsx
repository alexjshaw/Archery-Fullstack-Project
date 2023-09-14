import React, { Fragment, useContext } from "react";
import Hero from "../components/Hero";
import HomeContent from "../components/HomeContent";

const Home = () => {
  console.log("Home Loaded");

  return (
    <Fragment>
      <Hero />
      <hr />
      <HomeContent />
    </Fragment>
  );
};

export default Home;
