const Validator = require('validator');
const isEmpty = require('./is-empty');

module.exports = function validateEducationInput(data) {
  let errors = {};

  // Workaround since validator requires everything to be a string
  // if its not empty, it is what it is, otherwise it is a string
  // and can be tested below for purposes of sending back error message
  // password2 will be the confirm password

  data.school = !isEmpty(data.school) ? data.school : '';
  data.degree = !isEmpty(data.degree) ? data.degree : '';
  data.fieldofstudy = !isEmpty(data.fieldofstudy)
    ? data.fieldofstudy
    : '';
  data.from = !isEmpty(data.from) ? data.from : '';

  if (Validator.isEmpty(data.school)) {
    errors.school = 'School field is required';
  }
  if (Validator.isEmpty(data.degree)) {
    errors.degree = 'Degree field is required';
  }

  if (Validator.isEmpty(data.fieldofstudy)) {
    errors.fieldofstudy = 'Field of study is a required field';
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
