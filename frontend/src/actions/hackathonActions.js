import axios from "axios";
import setAuthToken from "../utils/setAuthToken";

import { GET_HACKATHON, GET_HACKATHONS, GET_ERRORS } from "./types";

export const createHackathon = data => dispatch => {
  console.log("here");
  axios
    .post("/hackathon", data)
    .then(res => {
      console.log(res);
      dispatch({
        type: GET_HACKATHON,
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
