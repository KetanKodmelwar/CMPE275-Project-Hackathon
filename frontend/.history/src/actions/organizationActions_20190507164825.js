import axios from "axios";
import setAuthToken from "../utils/setAuthToken";

import { GET_ORGANIZATION, SET_ORGANIZATION, GET_ERRORS } from "./types";

export const createOrganization = data => dispatch => {
  debugger;
  axios
    .post("/organization", data)
    .then(res => {
      console.log("Organization response ", res);
      dispatch({
        type: SET_ORGANIZATION,
        payload: res.data
      });
    })
    .catch(err => {
      console.log(err);
      dispatch({
        type: GET_ERRORS,
        payload: err
      });
    });
};
