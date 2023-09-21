import React, { Fragment, useContext } from "react";
import Hero from "../components/home/Hero";
import HomeContent from "../components/home/HomeContent";

const HomeView = () => {
  console.log("Home Loaded");

  return (
    <Fragment>
      <Hero />
      <hr />
      <HomeContent />
    </Fragment>
  );
};

export default HomeView;
