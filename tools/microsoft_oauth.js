const passport = require('passport');
const MicrosoftStrategy = require('passport-microsoft').Strategy;
const jwt = require('jsonwebtoken');
passport.use(new MicrosoftStrategy({  
callbackURL: `http://localhost:3000/auth/microsoft/redirect`,  
clientID: process.env.MICROSOFT_CLIENT_ID,  
clientSecret: process.env.MICROSOFT_CLIENT_SECRET,  
scope: ['openid', 'profile', 'email']  
} ,
  async (accessToken, refreshToken, profile, done) => {
    try {
      let user_email = profile.emails && profile.emails[0].value; //profile object has the user info
      let [user] = await db('users').select(['id', 'name', 'email']).where('email', user_email); //check whether user exist in database
      let redirect_url = "";
      if (user) {
        const token = jwt.sign(user, process.env.JWT_SECRET, { expiresIn: '1h' }); //generating token
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