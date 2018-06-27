// When we're in heroku enviornment is set automatically there to 'production'
if (process.env.NODE_ENV === 'production') {
  module.exports = require('./keys_prod');
} else {
  // in local environment will default to this
  module.exports = require('./keys_dev');
}
