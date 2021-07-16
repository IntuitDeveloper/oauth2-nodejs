const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
const FacebookStrategy = require('passport-facebook').Strategy;
const LocalStrategy  = require("passport-local").Strategy;
const config = require("../config.json")
const bcrypt = require('bcryptjs');
const Users = require("../models/userModel")
const createToken = require("../utils/token")
passport.use(new LocalStrategy( 
    {
        usernameField: 'email',
        passwordField: 'password',
    },
    async (username, password, done) => {
        const user = await Users.findOne({ username: username });
        if (!user) return done(null, false, { success: false, message: "User Not Found" });
        const isMatch = await bcrypt.compare(password, user.password);
        if(!isMatch)  return done(null,false, {success: false, type: 'password', message: 'Password did not match' });
        const payload = {email: user.username, password : user.password}
        const token = await jwtToken.createToken(payload);
        return done(null, { success: true, token, user: user })
    })
);

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