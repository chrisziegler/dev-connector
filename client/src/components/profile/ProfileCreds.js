import React, { Component } from 'react';
import PropTypes from 'prop-types';

export class ProfileCreds extends Component {
  static propTypes = {
    profile: PropTypes.object.isRequired
  };

  render() {
    return (
      <div className="row">
        <div className="col-md-6">
          <h3 className="text-center text-info">Experience</h3>
          <ul className="list-group">
            <li className="list-group-item">
              <h4>Microsoft</h4>
              <p>Oct 2011 - Current</p>
              <p>
                <strong>Position:</strong> Senior Developer
              </p>
              <p>
                <strong>Description:</strong> Lorem ipsum dolor sit
                amet consectetur adipisicing elit. Unde doloribus
                dicta enim excepturi laborum voluptatem nam provident
                quisquam facere. Quae?
              </p>
            </li>
            <li className="list-group-item">
              <h4>Sun Microsystems</h4>
              <p>Oct 2004 - Nov 2011</p>
              <p>
                <strong>Position: </strong> Systems Admin
              </p>
              <p>
                <span>
                  <strong>Location: </strong> Miami, FL
                </span>
                <strong>Description: </strong> Lorem ipsum dolor sit
                amet consectetur adipisicing elit. Unde doloribus
                dicta enim excepturi laborum voluptatem nam provident
                quisquam facere. Quae?
              </p>
            </li>
          </ul>
        </div>

        <div className="col-md-6">
          <h3 className="text-center text-info">Education</h3>
          <ul className="list-group">
            <li className="list-group-item">
              <h4>Univeresity Of Washington</h4>
              <p>Sep 1993 - June 1999</p>
              <p>
                <strong>Degree: </strong>Masters
              </p>
              <p>
                <strong>Field Of Study: </strong>Computer Science
              </p>
              <p>
                <span>
                  <strong>Description:</strong> Lorem ipsum dolor sit
                  amet consectetur adipisicing elit. Unde doloribus
                  dicta enim excepturi laborum voluptatem nam
                  provident quisquam facere. Quae?
                </span>
              </p>
            </li>
          </ul>
        </div>
      </div>
    );
  }
}

export default ProfileCreds;
