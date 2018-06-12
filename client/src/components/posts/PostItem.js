import React, { Component } from 'react';
import PropTypes from 'prop-types';

export class PostItem extends Component {
  static propTypes = { post: PropTypes.array.isRequired };

  render() {
    const { name, avatar, text } = this.props.post;
    return (
      <div>
        <h4>{name}</h4>
        <p>{text}</p>
      </div>
    );
  }
}

export default PostItem;
