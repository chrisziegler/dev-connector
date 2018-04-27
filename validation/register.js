const validator = require('validator');
const isEmpty = require('./is-empty');

module.exports = function validateRegisterInput(data) {
  let errors = {};

  // Workaround since validator requires everything to be a string
  // if its not empty, it is what it is, otherwise it is a string
  // and can be tested below for purposes of sending back error message
  data.name = !isEmpty(data.name) ? data.name : '';

  if (!validator.isLength(data.name, { min: 2, max: 30 })) {
    errors.name = 'Name must be betwteen 2 and 30 characters';
  }

  if (Validator.isEmpty(data.name)) {
    errors.name = 'Name field is required';
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
};
