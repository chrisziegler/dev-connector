import {
  ADD_POST,
  GET_POSTS,
  POST_LOADING,
  DELETE_POST
} from '../actions/types';

const initialState = {
  posts: [],
  post: {},
  loading: false
};

export default function(state = initialState, action) {
  switch (action.type) {
    case POST_LOADING:
      // return initial state, and overwrite loading with true
      return {
        ...state,
        loading: true
      };
    case GET_POSTS:
      return {
        ...state,
        posts: action.payload,
        loading: false
      };
    case ADD_POST:
      return {
        ...state,
        posts: [action.payload, ...state.posts]
      };
    case DELETE_POST:
      return {
        ...state,
        // note filter method will return an array
        posts: state.posts.filter(post => post._id !== action.payload)
      };
    default:
      return state;
  }
}
