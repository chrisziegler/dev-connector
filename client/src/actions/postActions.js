import axios from 'axios';
// import setAuthToken from '../utils/setAuthToken';
// import jwt_decode from 'jwt-decode';

import {
  ADD_POST,
  GET_POSTS,
  GET_ERRORS,
  POST_LOADING,
  DELETE_POST
} from './types';

// Add Post
export const addPost = postData => dispatch => {
  axios
    .post('/api/posts', postData)
    .then(res =>
      dispatch({
        type: ADD_POST,
        payload: res.data
      })
    )
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};

// Get Posts
export const getPosts = () => dispatch => {
  dispatch(setPostLoading());
  axios
    .get('/api/posts')
    .then(res =>
      dispatch({
        type: GET_POSTS,
        payload: res.data
      })
    )
    // if there's an error we don't want to GET_ERRORS, since we don't have a form or
    // anything needing to display them, just use the same dispatch with a null payload
    .catch(err =>
      dispatch({
        type: GET_POSTS,
        payload: null
      })
    );
};

// Delete Post
export const deletePost = id => dispatch => {
  axios
    .delete(`/api/posts/${id}`)
    .then(res =>
      dispatch({
        type: DELETE_POST,
        // res.data here is just { success: true }
        // post needs to be removed from app state in reducer
        payload: id
      })
    )
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};

// Set loading state
export const setPostLoading = () => {
  return {
    type: POST_LOADING
  };
};
