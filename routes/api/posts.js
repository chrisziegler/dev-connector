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

// @route   GET api/posts/test
// @desc    Tests post route
// @access  Public
router.get('/test', (req, res) => res.json({ msg: 'Posts Works' }));

// @route   POST api/posts
// @desc    Create post
// @access  Private
router.post(
  '/',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    const { errors, isValid } = validatePostInput(req.body);
    // Check validation - if not valid then...
    if (!isValid) {
      return res.status(400).json(errors);
    }
    const newPost = new Post({
      // in react, redux will keep this information in state throughout the
      // entire application, and we'll have acces to it whenever wa want
      // most these fields so far are just being pulled from the token of
      // logged-in user, nothing to type in except for text.
      text: req.body.text,
      name: req.body.name,
      avatar: req.body.avatar,
      user: req.user.id
    });

    newPost.save().then(post => res.json(post));
  }
);

module.exports = router;
