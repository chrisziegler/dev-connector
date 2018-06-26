import axios from 'axios';
// import setAuthToken from '../utils/setAuthToken';
// import jwt_decode from 'jwt-decode';

import {
  ADD_POST,
  GET_POSTS,
  GET_POST,
  GET_ERRORS,
  POST_LOADING,
  DELETE_POST,
  LIKE_POST
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

// Get Post
export const getPost = id => dispatch => {
  dispatch(setPostLoading());
  axios
    .get(`/api/posts/${id}`)
    .then(res =>
      dispatch({
        type: GET_POST,
        payload: res.data
      })
    )
    // if there's an error we don't want to GET_ERRORS, since we don't have a form or
    // anything needing to display them, just use the same dispatch with a null payload
    .catch(err =>
      dispatch({
        type: GET_POST,
        payload: null
      })
    );
};

// Add like
export const addLike = id => dispatch => {
  axios
    .post(`/api/posts/like/${id}`)
    .then((
      { data } // destructure data off response
    ) =>
      dispatch({
        type: LIKE_POST,
        payload: data //pass in updated post
      })
    )
    .catch(({ response }) =>
      dispatch({
        type: GET_ERRORS,
        payload: response.data
      })
    );
};

//Remove Like
export const removeLike = id => dispatch => {
  axios
    .post(`/api/posts/unlike/${id}`)
    .then(({ data }) => {
      dispatch({
        type: LIKE_POST,
        payload: data //pass in updated post
      });
    })
    .catch(({ response }) => {
      dispatch({
        type: GET_ERRORS,
        payload: response.data
      });
    });
};

// Add Comment
export const addComment = (postId, commentData) => dispatch => {
  axios
    .post(`/api/posts/comment/${postId}`, commentData)
    .then(res =>
      dispatch({
        type: GET_POST,
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

// Delete Comment
export const deleteComment = (postId, commentId) => dispatch => {
  axios
    .delete(`/api/posts/comment/${postId}/${commentId}`)
    .then(res =>
      dispatch({
        // Gives us back the post w/deleted comment
        type: GET_POST,
        payload: res.data
      })
    )
    .catch(err =>
      dispatch({
        // if not, we get the errors
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
