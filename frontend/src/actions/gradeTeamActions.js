import axios from "axios";
import setAuthToken from "../utils/setAuthToken";

import { GRADE_TEAM,GET_ERRORS } from "./types";

export const gradeTeam = data => dispatch => {
  console.log("Inside grade team request")
  console.log(data)
  axios
    .put("/team/grade", data)
    .then(res => {
      console.log("Team update response ", res);
      
    })
    .catch(err => {
      console.log(err);
      dispatch({
        type: GET_ERRORS,
        payload: err
      });
    });
};

