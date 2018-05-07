import { TEST_DISPATCH } from './types';
import axios from 'axios';

// const register = newUser => {
//   axios
//     .post('/api/users/register', newUser)
//     .then(res => console.log(res.data))
//     .catch(err => this.setState({ errors: err.response.data }));
// };
// Register User
export const registerUser = userData => {
  return {
    type: TEST_DISPATCH,
    payload: userData
  };
};
