import axios from "axios";
import setAuthToken from "../utils/setAuthToken";

import { GET_HACKATHON, GET_HACKATHONS, GET_ERRORS, GET_JUDGES,GET_GRADE_HACKATHONS } from "./types";

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



export const getGradeHackathons = () => dispatch => {
  console.log("get Hcakathons to be graded action");
  axios
    .get("/hackathon/judging")
    .then(res => {
      console.log("INside get grade hackathon")
      console.log(res)
      dispatch({
        type: GET_GRADE_HACKATHONS,
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

