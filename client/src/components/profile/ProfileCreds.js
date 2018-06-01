import React, { Component } from 'react';
import Moment from 'react-moment';
import PropTypes from 'prop-types';

export class ProfileCreds extends Component {
  static propTypes = {
    profile: PropTypes.object.isRequired
  };

  render() {
    const { education, experience } = this.props.profile;
    return (
      <div className="row">
        <div className="col-md-6">
          <h3 className="text-center text-info">Experience</h3>
          <ul className="list-group">
            {experience.map(exp => (
              <li key={exp._id} className="list-group-item">
                <h4>{exp.company}</h4>
                <p>
                  <Moment format="YYYY/MM/DD">{exp.from}</Moment> -
                  {exp.to ? (
                    <Moment format="YYYY/MM/DD">{exp.to}</Moment>
                  ) : (
                    ' Now'
                  )}
                </p>
                <p>
                  <strong>Position:</strong> {exp.title}
                </p>
                <p>
                  <strong>Description:</strong> {exp.description}
                </p>
              </li>
            ))}
          </ul>
        </div>

        <div className="col-md-6">
          <h3 className="text-center text-info">Education</h3>
          <ul className="list-group">
            {education.map(edu => (
              <li key={edu._id} className="list-group-item">
                <h4>{edu.school}</h4>
                <p>Sep 1993 - June 1999</p>
                <p>
                  <strong>Degree: </strong>
                  {edu.degree}
                </p>
                <p>
                  <strong>Field Of Study: </strong>
                  {edu.fieldofstudy}
                </p>
                <p>
                  <span>
                    <strong>Description:</strong> {edu.description}
                  </span>
                </p>
              </li>
            ))}
          </ul>
        </div>
      </div>
    );
  }
}

export default ProfileCreds;
