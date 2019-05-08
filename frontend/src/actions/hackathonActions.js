import axios from "axios";
import setAuthToken from "../utils/setAuthToken";

import { GET_HACKATHON, GET_HACKATHONS, GET_ERRORS, GET_JUDGES } from "./types";

export const createHackathon = data => dispatch => {
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


export const getHackathons = () => dispatch => {
  console.log("here");
  axios
    .get("/hackathon/all")
    .then(res => {
      //console.log(res);
      dispatch({
        type: GET_HACKATHONS,
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

export const getHackathon = id => dispatch => {
  console.log("here");
  axios
    .get(`/hackathon/${id}`)
    .then(res => {
      //console.log(res);
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




export const getSponsors = () => dispatch => {
  console.log("get sponsor action");
  axios
    .get("/user/hackers")
    .then(res => {
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
