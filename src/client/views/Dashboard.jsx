import React, { useEffect, useState, Fragment, useContext } from "react";
import { useAuth0 } from "@auth0/auth0-react";

const Dashboard = () => {
  console.log('Dashboard Loaded')
  const { user } = useAuth0()

  function showUser() {
    console.log(user)
  }

  return (
    <Fragment>
      <p>DASHBOARD PAGE</p>
      <button onClick={showUser}>View User</button>
    </Fragment>
  );
}

export default Dashboard;