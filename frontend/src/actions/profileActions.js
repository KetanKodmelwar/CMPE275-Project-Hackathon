import axios from "axios";
import setAuthToken from "../utils/setAuthToken";

import { UPDATE_PROFILE,GET_ERRORS } from "./types";

export const updateProfile = (data,history) => dispatch => {
  console.log("Inside update profile request")
  console.log(data)
  axios
    .put("/user", data)
    .then(res => {
      console.log("User update response ", res);
      alert("Profile updated");
      history.push("/dashboard");
      
    })
    .catch(err => {
      console.log(err);
      dispatch({
        type: GET_ERRORS,
        payload: err
      });
    });
};

