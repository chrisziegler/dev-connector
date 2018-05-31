import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import ProfileHeader from './ProfileHeader';
import ProfileAbout from './ProfileAbout';
import ProfileCreds from './ProfileCreds';
import ProfileGithub from './ProfileGithub';
import Spinner from '../common/Spinner';
import { getProfileByHandle } from '../../actions/profileActions';

class Profile extends Component {
  static propTypes = {
    profile: PropTypes.object.isRequired,
    getProfileByHandle: PropTypes.func.isRequired
  };

  componentDidMount() {
    const { handle } = this.props.match.params;
    if (handle) {
      this.props.getProfileByHandle(handle);
    }
  }

  render() {
    return (
      <div>
        <ProfileHeader />
        <ProfileAbout />
        <ProfileCreds />
        <ProfileGithub />
      </div>
    );
  }
}
const mapStateToProps = state => ({
  profile: state.profile
});

export default connect(mapStateToProps, { getProfileByHandle })(
  Profile
);
