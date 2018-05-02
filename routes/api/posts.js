const express = require('express');
const router = express.Router();
// we add mongoose because we're now working with the databse
const mongoose = require('mongoose');
// and passport because we will use authorized private routes
const passport = require('passport');

// bring in the Post model
const Post = require('../../models/Post');
// Validation
const validatePostInput = require('../../validation/post');

// @route   GET api/posts
// @desc    Fetch all posts
// @access  Public
router.get('/', (req, res) => {
  Post.find()
    .sort({ date: -1 })
    .then(posts => res.json(posts))
    .catch(err => res.status(404).json({ noposts: 'No posts found' }));
});

// @route   GET api/posts/:id
// @desc    Get a post by id, to see post detail with comments
// @access  Public
router.get('/:id', (req, res) => {
  Post.findById(req.params.id)
    .then(post => res.json(post))
    .catch(err => res.status(404).json({ nopost: 'No post found with that ID' }));
});

// @route   POST api/posts
// @desc    Create post
// @access  Private
router.post('/', passport.authenticate('jwt', { session: false }), (req, res) => {
  const { errors, isValid } = validatePostInput(req.body);
  // Check validation - if not valid then...
  if (!isValid) {
    return res.status(400).json(errors);
  }
  const newPost = new Post({
    text: req.body.text,
    name: req.body.name,
    avatar: req.body.avatar,
    user: req.user.id
  });

  newPost.save().then(post => res.json(post));
});

// @route   DELETE api/posts/:id
// @desc    Delete post
// @access  Private
router.delete('/:id', passport.authenticate('jwt', { session: false }), (req, res) => {
  Post.findById(req.params.id)
    .then(post => {
      // post's user field is a MongoID type
      // compare this to the id of the logged-in user on the token
      if (post.user.toString() !== req.user.id) {
        // 401 is an unauthroized status
        return res.status(401).json({ notauthorized: 'User not authorized' });
      }
      //Delete
      post.remove().then(() => res.json({ success: true }));
    })
    .catch(err => res.json({ nopost: 'Post not found with that ID' }));
});

// @route   POST api/posts/like/:id
// @desc    like post
// @access  Private
router.post('/like/:id', passport.authenticate('jwt', { session: false }), (req, res) => {
  Post.findById(req.params.id)
    .then(post => {
      if (post.likes.filter(like => like.user.toString() === req.user.id).length > 0) {
        return res.status(400).json({ alreadyliked: 'User already liked this post' });
      }
      //Add user id to likes array
      post.likes.unshift({ user: req.user.id });
      post.save().then(post => res.json(post));
    })
    .catch(err => res.json({ nopost: 'Post not found with that ID' }));
});

// @route   POST api/posts/unlike/:id
// @desc    unlike post
// @access  Private
router.post(
  '/unlike/:id',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    Post.findById(req.params.id)
      .then(post => {
        if (
          post.likes.filter(like => like.user.toString() === req.user.id).length === 0
        ) {
          return res.status(400).json({ notliked: 'You have not yet liked this post' });
        }
        // Get removeIndex
        const removeIndex = post.likes
          // indexOf requires a string
          // since the user is the id of the user that liked the post
          // it is a weird MongoDb $oid, even though it looks like a string
          // convert it for methods and comparrisons to other strings
          .map(item => item.user.toString())
          .indexOf(req.user.id);
        // splice user out of array
        post.likes.splice(removeIndex, 1);
        post.save().then(post => res.json(post));
      })
      .catch(err => res.json({ nopost: 'Post not found with that ID' }));
  }
);

// @route   POST api/posts/comment/:id
// @desc    Create comments
// @access  Private
router.post(
  '/comment/:id',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    // same requirements as post validation
    const { errors, isValid } = validatePostInput(req.body);
    // Check validation - if not valid then...
    if (!isValid) {
      return res.status(400).json(errors);
    }
    Post.findById(req.params.id)
      .then(post => {
        const newComment = {
          text: req.body.text,
          name: req.body.name,
          avatar: req.body.avatar,
          user: req.user.id
        };
        // Add to comments array
        post.comments.unshift(newComment);
        post.save().then(post => res.json(post));
      })
      .catch(err => res.status(404).json({ nocomment: 'Post no longer exists' }));
  }
);

// @route   DELETE api/posts/comment/:id/:comment_id
// @desc    Delete comment
// @access  Private
router.delete(
  '/comment/:id/:comment_id',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    Post.findById(req.params.id)
      .then(post => {
        if (!post) {
          return res.status(404).json({ nopost: 'Post no longer exists' });
        }
        const removeIndex = post.comments
          .map(comment => comment._id.toString())
          .indexOf(req.params.comment_id);

        //Make sure only the comment owner can delete comment
        if (req.user.id !== post.comments[removeIndex].user.toString()) {
          return res.status(401).json({ notauthorized: 'User not authorized' });
        }

        post.comments.splice(removeIndex, 1);
        post.save().then(post => res.json(post));
      })
      .catch(err => res.json(err));
  }
);

module.exports = router;
