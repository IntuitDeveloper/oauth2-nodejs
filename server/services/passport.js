const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
const FacebookStrategy = require('passport-facebook').Strategy;
const config = require("../config.json")

passport.use(new GoogleStrategy({
    clientID: config.GOOGLE_CLIENT_ID,
    clientSecret: config.GOOGLE_CLIENT_SECRET,
    callbackURL: "http://localhost:5500/auth/google/callback",
    proxy: true,
    },
    function(accessToken, refreshToken, profile, done) {
        userProfile=profile;
        return done(null, userProfile);
    }
));

passport.use(new FacebookStrategy({
    clientID: config.facebook_clientId,
    clientSecret: config.facebook_clientSecret,
    callbackURL: config.facebook_callbackUrl
    }, function (accessToken, refreshToken, profile, done) {
    userProfile = profile;
    return done(null, userProfile);
    }
));