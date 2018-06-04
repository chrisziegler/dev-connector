import React, { Component } from 'react';
import PropTypes from 'prop-types';

class ProfileAbout extends Component {
  static propTypes = {
    profile: PropTypes.object.isRequired
  };

  render() {
    const { profile } = this.props;
    const firstName = profile.user.name.trim().split(' ')[0];

    return (
      <div className="row">
        <div className="col-md-12">
          <div className="card card-body bg-light mb-3">
            <h3 className="text-center text-info">
              {profile.user.name}
            </h3>

            {profile.bio ? (
              <p className="lead">{profile.bio}</p>
            ) : (
              <p>{firstName} does not have a bio.</p>
            )}

            <hr />
            <h3 className="text-center text-info">Skill Set</h3>
            <div className="row">
              <div className="d-flex flex-wrap justify-content-center align-items-center">
                {profile.skills.map(skill => (
                  <div key={skill} className="p-3">
                    <i className="fa fa-check" />
                    {skill}
                  </div>
                ))}

                {/* <div className="d-flex flex-wrap justify-content-center align-items-center">
                <div className="p-3">
                  <i className="fa fa-check" /> HTML
                </div>
                <div className="p-3">
                  <i className="fa fa-check" /> CSS
                </div>
                <div className="p-3">
                  <i className="fa fa-check" /> JavaScript
                </div>
                <div className="p-3">
                  <i className="fa fa-check" /> Python
                </div>
                <div className="p-3">
                  <i className="fa fa-check" /> C#
                </div>
              </div> */}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default ProfileAbout;
