const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const jwt = require('jsonwebtoken');
var dotenv = require("dotenv").config();
passport.use(new GoogleStrategy({
  callbackURL: `http://localhost:3000/auth/google/callback`,  //same URI as registered in Google console portal
   clientID: process.env.GOOGLE_CLIENT_ID, //replace with copied value from Google console
   clientSecret: process.env.GOOGLE_CLIENT_SECRET,  
},
  async (accessToken, refreshToken, profile, done) => {
    try {
        console.log("profile is= ",profile);
      let user_email = profile.emails && profile.emails[0].value; //profile object has the user info
     // let [user] = await db('users').select(['id', 'name', 'email']).where('email', user_email); //check whether user exist in database
     let user = {'id' : 23, 'name' : 'Komal Arya', 'email' : "arya24komal@gmail.com"};
      let redirect_url = "";
      if (user) {
          console.log("user is = ",user);
        const token = jwt.sign(user, process.env.JWT_SECRET, { expiresIn: '2h' }); //generating token
        redirect_url = `http://localhost:3000/${token}` //registered on FE for auto-login
        return done(null, redirect_url);  //redirect_url will get appended to req.user object : passport.js in action
      } else {
        redirect_url = `http://localhost:3000/user-not-found/`;  // fallback page
        return done(null, redirect_url);
      }
    } catch (error) {
      done(error)
    }
  }
));