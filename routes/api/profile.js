const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
// Require-in passport for protected routes
const passport = require('passport');
// Load validation
const validateProfileInput = require('../../validation/profile');
// Load Models to use in mongoose
const Profile = require('../../models/Profile');
const User = require('../../models/User');

// @route   GET api/profile/test
// @desc    Tests profile route
// @access  Public
router.get('/test', (req, res) => res.json({ msg: 'Profile Works' }));

// with protected (private routes) we're not using profile/:id
// we get a token, so we can use that

// @route   GET api/profile/
// @desc    Get current users profile
// @access  Private
// Our protected route is again middleware
router.get(
  '/',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    // User getting their profile is like clicking a link, they don't explicitly
    // send any data with their request, but there will be a token attached by passport
    // find a Profile model with the user property w/a value that matches that id.
    const errors = {};
    Profile.findOne({ user: req.user.id })
      .populate('user', ['name', 'avatar'])
      .then(profile => {
        if (!profile) {
          errors.noprofile = 'There is no profile for this user';
          return res.status(404).json(errors);
        }
        return res.json(profile);
      })
      .catch(err => res.status(404).json(err));
  }
);

// @route   GET api/profile/handle/:handle
// @desc    Get profile by handle (not for frontend)
// @access  Public
router.get('/handle/:handle', (req, res) => {
  const errors = {};
  Profile.findOne({ handle: req.params.handle })
    .populate('user', ['name', 'avatar'])
    .then(profile => {
      if (!profile) {
        errors.noprofile = 'No profile for this user';
        return res.status(404).json(errors);
      }
      return res.json(profile);
    });
});

// @route   POST api/profile/
// @desc    Create or Edit user profile
// @access  Private
router.post(
  '/',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    const { errors, isValid } = validateProfileInput(req.body);
    // Check validation
    if (!isValid) {
      // Return errors
      return res.status(400).json(errors);
    }
    // Get fields
    const profileFields = {};
    profileFields.user = req.user.id;
    if (req.body.handle) profileFields.handle = req.body.handle;
    if (req.body.company) profileFields.company = req.body.company;
    if (req.body.website) profileFields.website = req.body.website;
    if (req.body.location) profileFields.location = req.body.location;
    if (req.body.bio) profileFields.bio = req.body.bio;
    if (req.body.status) profileFields.status = req.body.status;
    if (req.body.githubusername)
      profileFields.githubusername = req.body.githubusername;
    // Skills - Spilt into array
    if (typeof req.body.skills !== 'undefined') {
      profileFields.skills = req.body.skills.split(',');
    }

    // Social
    profileFields.social = {};
    if (req.body.youtube)
      profileFields.social.youtube = req.body.youtube;
    if (req.body.twitter)
      profileFields.social.twitter = req.body.twitter;
    if (req.body.facebook)
      profileFields.social.facebook = req.body.facebook;
    if (req.body.linkedin)
      profileFields.social.linkedin = req.body.linkedin;
    if (req.body.instagram)
      profileFields.social.instagram = req.body.instagram;

    Profile.findOne({ user: req.user.id }).then(profile => {
      if (profile) {
        //  Update
        Profile.findOneAndUpdate(
          { user: req.user.id },
          { $set: profileFields },
          { new: true }
        ).then(profile => res.json(profile));
      } else {
        // No profile, so Create and save one after this one bit of validation for handlers
        // Check if handle is already taken by any of the users (There can be only one)
        Profile.findOne({ handle: profileFields.handle }).then(
          profile => {
            if (profile) {
              errors.handle = 'That handle already exists';
              res.status(400).json(errors);
            }
            // Save Profile
            new Profile(profileFields)
              .save()
              .then(profile => res.json(profile));
          }
        );
      }
    });
  }
);

module.exports = router;
