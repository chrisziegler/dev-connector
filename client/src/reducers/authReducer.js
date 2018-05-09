import isEmpty from '../validation/is-empty';

import { SET_CURRENT_USER } from '../actions/types';

const initialState = {
  isAuthenticated: false,
  user: {}
};
export default function(state = initialState, action) {
  switch (action.type) {
    case SET_CURRENT_USER:
      return {
        ...state,
        // if this is filled with the decoded user this should be authenticated
        // isEmpty returns a boolean, so if it is empty isAuthenticated: false
        isAuthenticated: !isEmpty(action.payload),
        user: action.payload
      };
    default:
      return state;
  }
}
