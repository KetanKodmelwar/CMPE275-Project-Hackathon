import React, { Component } from "react";
//import { Route } from "react-router-dom";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import jwt_decode from "jwt-decode";
import setAuthToken from "../utils/setAuthToken";
import { setCurrentUser, logoutUser } from "../actions/authActions";
import { clearCurrentProfile } from "../actions/profileActions";
import { Provider } from "react-redux";
import { store } from "../store";

import PrivateRoute from "./common/PrivateRoute";

import SignUp from "./auth/SignUp";
import Login from "./auth/Login";
import Dashboard from "./DashBoard/Dashboard.js";

import CreateHackathon from "./CreateHackathon/CreateHackathon";
import JoinHackathon from "./JoinHackathon/JoinHackathon";
import GradeHackathon from "./GradeHackathon/GradeHackathon";
import Organization from "./Organization/Organization";

//Check for token
if (localStorage.jwtToken) {
  // Set auth token header auth
  setAuthToken(localStorage.jwtToken);
  // Decode token and get user info and exp
  const decoded = jwt_decode(localStorage.jwtToken);
  // Set user and isAuthenticated
  store.dispatch(setCurrentUser(decoded));

  // Check for expired token
  const currentTime = Date.now() / 1000;
  if (decoded.exp < currentTime) {
    // Logout user
    store.dispatch(logoutUser());
    // Clear current Profile
    store.dispatch(clearCurrentProfile());
    // Redirect to login
    window.location.href = "/";
  }
}

class Main extends Component {
  render() {
    return (
      <div>
        <Switch>
          <Route path="/signup" exact component={SignUp} />
          <Route path="/" exact component={Login} />
          <Route path="/login" exact component={Login} />
          <Route path="/dashboard" exact component={Dashboard} />
          <Route path="/create-hackathon" exact component={CreateHackathon} />
          <Route path="/join-hackathon" exact component={JoinHackathon} />
          <Route path="/grade-hackathon" exact component={GradeHackathon} />
          <Route path="/organization" exact component={Organization} />
        </Switch>
      </div>
    );
  }
}
//Export The Main Componentnp
export default Main;
