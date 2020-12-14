'use strict';

require('dotenv').config()
var passport = require('passport'),
  TwitterTokenStrategy = require('passport-twitter-token')


module.exports = function () {

  passport.use(new TwitterTokenStrategy({
      consumerKey: process.env.TWITTER_API_KEY,
      consumerSecret: process.env.TWITTER_API_SECRET,
      includeEmail: true
    },
   ));

};