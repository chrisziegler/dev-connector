import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import classnames from 'classnames';
import { Link } from 'react-router-dom';

export class PostItem extends Component {
  static propTypes = {
    post: PropTypes.object.isRequired,
    auth: PropTypes.object.isRequired
  };

  onDeleteClick = postId => {
    console.log(postId);
  };

  render() {
    const {
      post,
      post: { user, text, name, avatar, likes },
      auth
    } = this.props;
    return (
      <div className="card card-body mb-3">
        <div className="row">
          <div className="col-md-2">
            <a href="profile.html">
              <img
                className="rounded-circle d-none d-md-block"
                src={avatar}
                alt="user avatar"
              />
            </a>
            <br />
            <p className="text-center">{name}</p>
          </div>
          <div className="col-md-10">
            <p className="lead">{text}</p>
            <button type="button" className="btn btn-light mr-1">
              <i className="text-info fas fa-thumbs-up" />
              <span className="badge badge-light">
                {likes.length}
              </span>
            </button>
            <button type="button" className="btn btn-light mr-1">
              <i className="text-secondary fas fa-thumbs-down" />
            </button>
            <Link
              to={`/post/${post._id}`}
              className="btn btn-info mr-1"
            >
              Comments
            </Link>
            {user === auth.user.id ? (
              <button
                onClick={this.onDeleteClick.bind(post._id)}
                type="button"
                className="btn btn-danger mr-1"
              >
                <i className="fas fa-times" />
              </button>
            ) : null}
          </div>
        </div>
      </div>
    );
  }
}

// we need to check if post is by current user to allow delete - need auth state
const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(mapStateToProps)(PostItem);
