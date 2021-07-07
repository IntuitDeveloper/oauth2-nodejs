var path = require('path')
var config = require('./config.json')
var express = require('express')
var session = require('express-session')
const passport = require('passport');
const FacebookStrategy = require('passport-facebook').Strategy;
var app = express()

app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'ejs')
app.use(express.static(path.join(__dirname, 'public')))
app.use(session({secret: 'secret', resave: 'false', saveUninitialized: 'false'}))

// Initial view - loads Connect To QuickBooks Button
app.get('/', function (req, res) {
  //res.render('home', config)
  res.render('login', config)
})


/*  PASSPORT SETUP  */
var userProfile;
app.use(passport.initialize());
app.use(passport.session());

passport.serializeUser(function(user, cb) {
  cb(null, user);
});

passport.deserializeUser(function(obj, cb) {
  cb(null, obj);
});

/*  passport-google-oauth SETUP  */
const GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
const GOOGLE_CLIENT_ID = config.GOOGLE_CLIENT_ID;
const GOOGLE_CLIENT_SECRET = config.GOOGLE_CLIENT_SECRET;
passport.use(new GoogleStrategy({
    clientID: GOOGLE_CLIENT_ID,
    clientSecret: GOOGLE_CLIENT_SECRET,
    callbackURL: "http://localhost:3000/auth/google/callback"
  },
  function(accessToken, refreshToken, profile, done) {
      userProfile=profile;
      return done(null, userProfile);
  }
));
 
app.get('/auth/google', 
  passport.authenticate('google', { scope : ['profile', 'email'] }));
 
app.get('/auth/google/callback', 
  passport.authenticate('google', { failureRedirect: '/error' }),
  function(req, res) {
    // Successful authentication, redirect success.
    res.redirect('/success');
  });


  app.get('/success', (req, res) =>{ 
    //res.send(userProfile); 
    res.render("profile",{user: userProfile});
    });
    app.get('/error', (req, res) => res.send("error logging in"));

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

  app.get('/auth/facebook', passport.authenticate('facebook', {
    scope: ['public_profile']
  }));
  
  app.get('/auth/facebook/callback',
    passport.authenticate('facebook', {
      successRedirect: '/profile',
      failureRedirect: '/error'
    }));
  
  app.get('/logout', function (req, res) {
    req.logout();
    res.redirect('/');
  });

  app.get('/profile', (req, res) =>{ 
    //res.send(userProfile); 
    res.render("facebook_profile",{user: userProfile});
    });
    app.get('/error', (req, res) => res.send("error logging in"));


// Sign In With Intuit, Connect To QuickBooks, or Get App Now
// These calls will redirect to Intuit's authorization flow
app.use('/sign_in_with_intuit', require('./routes/sign_in_with_intuit.js'))
app.use('/connect_to_quickbooks', require('./routes/connect_to_quickbooks.js'))
app.use('/connect_handler', require('./routes/connect_handler.js'))

// Callback - called via redirect_uri after authorization
app.use('/callback', require('./routes/callback.js'))

// Connected - call OpenID and render connected view
app.use('/connected', require('./routes/connected.js'))

// Call an example API over OAuth2
app.use('/api_call', require('./routes/api_call.js'))


// Start server on HTTP (will use ngrok for HTTPS forwarding)
app.listen(3000, function () {
  console.log('Example app listening on port 3000!')
})
