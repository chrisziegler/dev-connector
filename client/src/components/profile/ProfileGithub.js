import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

class ProfileGithub extends Component {
  static propTypes = {
    profile: PropTypes.object.isRequired
  };

  render() {
    // remove this mock object meant to prevent errors in testing
    const repo = {
      id: 'tempid',
      html_url: 'tempUrl'
    };
    const { profile } = this.props;
    return (
      <div ref="myRef">
        <hr />
        <h3 className="mb-4">Latest Github Repos</h3>
        <div key={repo.id} className="card card-body mb-2">
          <div className="row">
            <div className="col-md-6">
              <h4>
                <Link
                  to={repo.html_url}
                  className="text-info"
                  target="_blank"
                >
                  {' '}
                  Repository One
                </Link>
              </h4>
              <p>Repository description</p>
            </div>
            <div className="col-md-6">
              <span className="badge badge-info mr-1">Stars: 44</span>
              <span className="badge badge-secondary mr-1">
                Watchers: 21
              </span>
              <span className="badge badge-success">Forks: 122</span>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default ProfileGithub;
