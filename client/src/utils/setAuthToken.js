import axios from 'axios';

// Setting axios defaults--one of the reason to chose axios over built-in fetch
// Prevents from manually ensuring there is a token for each request

const setAuthToken = token => {
  if (token) {
    //Apply to every request
    axios.defaults.headers.common['Authorization'] = token;
  } else {
    // Delete auth header
    delete axios.defaults.headers.common['Authorization'];
  }
};

export default setAuthToken;
