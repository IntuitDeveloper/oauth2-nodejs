const router = require('express').Router();
var config = require('../config.json')
const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
 const FacebookStrategy = require('passport-facebook').Strategy;

const successLoginUrl = "http://localhost:5500/login/success";
const errorLoginUrl = "http://localhost:5500/login/error";


passport.use(new GoogleStrategy({
    clientID: config.GOOGLE_CLIENT_ID,
    clientSecret: config.GOOGLE_CLIENT_SECRET,
    callbackURL: "/auth/google/callback",
    proxy: true,
  },
  function(accessToken, refreshToken, profile, done) {
      userProfile=profile;
      return done(null, userProfile);
  }
));
router.get('/google', 
  passport.authenticate('google', { scope : ['profile', 'email'] }));
 
  router.get('/google/callback', 
  passport.authenticate('google', { 
  failureRedirect: errorLoginUrl,
  successRedirect: successLoginUrl,
  }),
  function(req, res) {
    res.send("Thank you!")
  }
);



 /*  FacebookStrategy SETUP  */
 passport.use(new FacebookStrategy({
   clientID: config.facebook_clientId,
   clientSecret: config.facebook_clientSecret,
   callbackURL: config.facebook_callbackUrl
 }, function (accessToken, refreshToken, profile, done) {
   userProfile = profile;
   return done(null, userProfile);
 }
));

router.get('/facebook', passport.authenticate('facebook', {
 scope: ['public_profile']
}));

router.get('/facebook/callback',
 passport.authenticate('facebook', {
   successRedirect: successLoginUrl,
   failureRedirect: errorLoginUrl
 }));



// router.get('/verify', userCtrl.verifiedToken);

module.exports = router;
