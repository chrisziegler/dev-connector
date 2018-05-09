import axios from 'axios';
import setAuthToken from '../utils/setAuthToken';
import jwt_decode from 'jwt-decode';

import { GET_ERRORS, SET_CURRENT_USER } from './types';

// Register User
export const registerUser = (userData, history) => dispatch => {
  axios
    .post('/api/users/register', userData)
    // redirect on promise resolution
    .then(res => history.push('/login'))
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};

// Login - Get User token
export const loginUser = userData => dispatch => {
  axios
    .post('/api/users/login', userData)
    // here we need to call then for our promise chain
    // take our response and open up a code block for our logic
    .then(res => {
      // save to localStorage (ls)--note: token contains user info as well
      // in order to decode from has need jwt decode
      const { token } = res.data;
      // Set token to ls
      // ls only stores strings, you can convert json to a string and then back
      // but here the token is already a string
      localStorage.setItem('jwtToken', token);
      // Set token to Authorization header
      setAuthToken(token);
      //Decode token to get user data incl. issuedAt date and exp
      const decoded = jwt_decode(token);
      // Set current user
      dispatch(setCurrentUser(decoded));
    })

    // don't need curly braces because we're just calling dispatch
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};

// Set logged in user
export const setCurrentUser = decoded => {
  return {
    type: SET_CURRENT_USER,
    payload: decoded
  };
};

// log user out
export const logoutUser = () => dispatch => {
  // Remove toke from localStorage
  localStorage.removeItem('jwtToken');
  // Remove auth header for future requests
  setAuthToken(false);
  // Set current user to {} which will set isAuthenticated to false
  dispatch(setCurrentUser({}));
};
