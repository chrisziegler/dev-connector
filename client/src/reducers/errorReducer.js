import { GET_ERRORS } from '../actions/types';
import { CLEAR_ERRORS } from '../actions/types';

const initialState = {};

export default function(state = initialState, action) {
  switch (action.type) {
    case GET_ERRORS:
      // the payload from this action is err.response.data
      return action.payload;
    case CLEAR_ERRORS:
      return {};
    default:
      return state;
  }
}
