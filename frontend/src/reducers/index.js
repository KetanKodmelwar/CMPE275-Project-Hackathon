import { combineReducers } from "redux";
import authReducer from "./authReducer";
import errorReducer from "./errorReducer";
import hackathonReducer from "./hackathonReducer"

export default combineReducers({
  auth: authReducer,
  errors: errorReducer,
  hackathon: hackathonReducer
});
