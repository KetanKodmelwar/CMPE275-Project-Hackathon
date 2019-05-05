import axios from "axios";

const setAuthToken = token => {
  debugger;
  if (token) {
    // Apply to every request
    console.log("token:" + token);
    axios.defaults.headers.common["Authorization"] = token;
  } else {
    // Delete auth header
    delete axios.defaults.headers.common["Authorization"];
  }
};

export default setAuthToken;
