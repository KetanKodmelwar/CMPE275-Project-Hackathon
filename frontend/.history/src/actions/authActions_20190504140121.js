import axios from "axios";
import setAuthToken from "../utils/setAuthToken";
import jwt_decode from "jwt-decode";
import Cookies from "js-cookie";
import { persistor } from "../store";

import { GET_ERRORS, SET_CURRENT_USER } from "./types";

// Register User
export const registerUser = (userData, token, history) => dispatch => {
  localStorage.setItem("jwtToken", token);
  localStorage.setItem("username", userData.screenName);

  // Set token to Auth header
  setAuthToken(token);
  // Decode token to get user data

  // Set current user

  axios
    .post("/user", userData)
    .then(res => history.push("/login"))
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};

// Login - Get User Token
export const loginUser = (userData, token) => dispatch => {
  setAuthToken(token);
  axios
    .get("/user", userData)
    .then(res => {
      // Save to localStorage
      console.log(res);

      // Set token to ls
      localStorage.setItem("jwtToken", token);
      localStorage.setItem("username", res.data.screenName);

      console.log(token);
      // Set token to Auth header
      //setAuthToken(token);

      // Decode token to get user data

      // Set current user
      dispatch(setCurrentUser(res.data));
    })
    .catch(
      err => console.log(err)
      // dispatch({
      //   type: GET_ERRORS,
      //   payload: err.response.data
      // })
    );
};

// Set logged in user
export const setCurrentUser = decoded => {
  return {
    type: SET_CURRENT_USER,
    payload: decoded
  };
};

// Log user out
export const logoutUser = () => dispatch => {
  // Remove token from localStorage
  localStorage.removeItem("jwtToken");
  // Remove auth header for future requests
  setAuthToken(false);
  persistor.purge();
  Cookies.remove("userName");
  Cookies.remove("studentFlag");
  // Set current user to {} which will set isAuthenticated to false
  dispatch(setCurrentUser({}));
};
