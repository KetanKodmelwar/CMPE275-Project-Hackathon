import isEmpty from "../validation/is-empty";

import { GET_HACKATHON,GET_HACKATHONS } from "../actions/types";

const initialState = {
  hackathon: {},
  hackathons:[]
};

export default function(state = initialState, action) {
  switch (action.type) {
    case GET_HACKATHON:
      return {
        ...state,
        hackathon: action.payload
      };
      case GET_HACKATHONS:
      return {
        ...state,
        hackathons: action.payload
      };
    default:
      return state;
  }
}
