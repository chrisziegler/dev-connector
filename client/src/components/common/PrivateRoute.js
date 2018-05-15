import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

// Depending on the auth status of the user, we’ll either render a Redirect
// or render the component (which is why we needed to destructure and rename
// the component prop in the function’s arguments
// presumably these rest props are going to include (but not limited to
// a path, like path="/dashboard" and exact. So we use our functional
// component to pass in a route and conditionally render another Component
// here based on how we call/use it in App.js we component={Dashboard}
const PrivateRoute = ({ component: Component, auth, ...rest }) => (
  <Route
    {...rest}
    render={props =>
      auth.isAuthenticated === true ? (
        <Component {...props} />
      ) : (
        <Redirect to="/login" />
      )
    }
  />
);

PrivateRoute.propTypes = {
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(mapStateToProps)(PrivateRoute);
