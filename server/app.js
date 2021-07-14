var config = require('./config.json')
var express = require('express')
var session = require('express-session')
const passport = require('passport');
var cors = require('cors')
const OAuthRouter = require('./routes/OAuthRouter');
var app = express()


app.use(cors({ origin: "http://localhost:5500", credentials: true }))
app.use(express.json());
app.use(session({secret: 'secret', resave: 'false', saveUninitialized: 'false'}))


// Initial view - loads Connect To QuickBooks Button

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


const isUserAuthenticated = (req, res, next) => {
if (req.session.passport.user) {
    next();
  }else {
    res.status(401).send("You must login first!");
  }
};

  app.use('/auth', OAuthRouter);
  app.get('/api/user', isUserAuthenticated, (req, res) => {
    res.status(200).json(req.session.passport.user);
  });
  app.post('/api/login', (req, res) => {
    console.log(req.body)
    res.json(req.body)
  });
  app.get('/api/logout', function (req, res) {
    req.logout();
    res.redirect('/');
  });



// // Sign In With Intuit, Connect To QuickBooks, or Get App Now
// // These calls will redirect to Intuit's authorization flow
app.use('/sign_in_with_intuit', require('./routes/sign_in_with_intuit.js'))
app.use('/connect_to_quickbooks', require('./routes/connect_to_quickbooks.js'))
app.use('/connect_handler', require('./routes/connect_handler.js'))

// // Callback - called via redirect_uri after authorization
app.use('/callback', require('./routes/callback.js'))

// // Connected - call OpenID and render connected view
app.use('/connected', require('./routes/connected.js'))

// // Call an example API over OAuth2
app.use('/api_call', require('./routes/api_call.js'))



// if(process.env.NODE_ENV === 'production'){
//   app.use(express.static('client/build'))
//   const path = require('path');
//   app.use('*', (req,res) => {
//     res.sendFile(path.resolve(__dirname, '..', 'client', 'build', 'index.html'))
//   })
// }

// Start server on HTTP (will use ngrok for HTTPS forwarding)
app.listen(3000, function () {
  console.log('Example app listening on port 3000!')
})

