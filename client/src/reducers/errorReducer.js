import { GET_ERRORS } from '../actions/types';

const initialState = {};

export default function(state = initialState, action) {
  switch (action.type) {
    case GET_ERRORS:
      // the payload from this action is err.response.data
      return action.payload;
    default:
      return state;
  }
}
