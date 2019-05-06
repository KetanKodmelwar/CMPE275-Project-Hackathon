import axios from "axios";
import setAuthToken from "../utils/setAuthToken";

import { GET_HACKATHON, GET_HACKATHONS, GET_ERRORS, GET_JUDGES } from "./types";

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


export const getJudges = () => dispatch => {
  console.log("get judges action");
  axios
    .get("/user/hackers")
    .then(res => {
      console.log(res.data);
      dispatch({
        type: GET_JUDGES,
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
