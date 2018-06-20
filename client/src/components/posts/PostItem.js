import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import {
  deletePost,
  addLike,
  removeLike
} from '../../actions/postActions';

export class PostItem extends Component {
  static propTypes = {
    post: PropTypes.object.isRequired,
    auth: PropTypes.object.isRequired,
    deletePost: PropTypes.func.isRequired,
    addLike: PropTypes.func.isRequired,
    removeLike: PropTypes.func.isRequired
  };

  onDeleteClick = id => {
    this.props.deletePost(id);
  };

  onLikeClick = id => {
    this.props.addLike(id);
  };

  onUnlikeClick = id => {
    this.props.removeLike(id);
  };

  // give green thumb to active users likes
  findUserLike = likes => {
    const { auth } = this.props;
    if (likes.filter(like => like.user === auth.user.id).length > 0) {
      return true;
    } else {
      return false;
    }
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
            <button
              onClick={() => this.onLikeClick(post._id)}
              type="button"
              className="btn btn-light mr-1"
            >
              <i
                className={`${
                  this.findUserLike(likes)
                    ? 'text-success'
                    : 'text-secondary'
                } fas fa-thumbs-up`}
              />
              <span className="badge badge-light">
                {likes.length}
              </span>
            </button>
            <button
              onClick={() => this.onUnlikeClick(post._id)}
              type="button"
              className="btn btn-light mr-1"
            >
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
                onClick={() => this.onDeleteClick(post._id)}
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

export default connect(
  mapStateToProps,
  { deletePost, addLike, removeLike }
)(PostItem);
