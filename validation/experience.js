const Validator = require('validator');
const isEmpty = require('./is-empty');

module.exports = function validateExperienceInput(data) {
  let errors = {};

  // Workaround since validator requires everything to be a string
  // if its not empty, it is what it is, otherwise it is a string
  // and can be tested below for purposes of sending back error message
  // password2 will be the confirm password

  data.title = !isEmpty(data.title) ? data.title : '';
  data.company = !isEmpty(data.company) ? data.company : '';
  data.from = !isEmpty(data.from) ? data.from : '';

  if (Validator.isEmpty(data.title)) {
    errors.title = 'Title field is required';
  }
  if (Validator.isEmpty(data.company)) {
    errors.company = 'Company field is required';
  }
  if (Validator.isEmpty(data.from)) {
    errors.from = 'From date field is required';
  }

  if (!Validator.isISO8601(data.from)) {
    errors.from = 'Please format from date to YYYY-MM-DD';
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
};
