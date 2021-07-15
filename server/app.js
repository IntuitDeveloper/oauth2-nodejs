var config = require('./config.json')
var express = require('express')
var session = require('express-session')
var cors = require('cors')
var jwt = require('jsonwebtoken');
const OAuthRouter = require('./routes/OAuthRouter');
var app = express()

app.use(cors({ origin: "http://localhost:5500", credentials: true }))
app.use(express.json());
app.use(session({secret: 'secret', resave: 'false', saveUninitialized: 'false'}))
const passport = require('passport');
const FacebookStrategy = require('passport-facebook').Strategy;
var LocalStrategy  = require('passport-local').Strategy;
const GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
var connection     = require('./database/connection.js');
const mongoose = require('mongoose');
const userSchema = require('./database/schema/userSchema.js')
const User = mongoose.model('user', userSchema, 'user')

/*  Mongo db setup */

async function createUser(username, password) {
  return new User({
    username,   
    password, 
    created: Date.now()
  }).save()
}

async function deleteUser(username) {
  return User.remove({username})
}

async function findUser(username) {
  return await User.findOne({ username })
};
// (async () => {
//  // const connector = mongoose.connect(connectionString,{useNewUrlParser: true, useUnifiedTopology: true})
//   const username = "komal76east@gmail.com";
//   const password = "Admin@1234";
//   console.log("connecting......");
//   let user = await connection.then(async () => {
//     return findUser(username) 
//   })

//   if (!user) {
//     console.log("adding = "+username);
//     user = await createUser(username, password)
//   }
//   else
//   {
//     console.log("login with user = "+username);
    
//   }
//   console.log(user);
//  // process.exit(0)
 
// })()


/* end Mongo db setup */

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

  var user;
  async function VerifyUser(username){
    console.log("username is = "+username);
     user = await connection.then(async () => {
      return findUser(username) 
    })
    return user;
  }

  // { email: 'admin@gmail.com', password: 'Admin@1234' }
  app.post('/api/login', async (req, res) => {
    console.log(req.body);    
    var login_detail = req.body;
    //res.json(req.body)
    const result = await VerifyUser(login_detail.email);    
    console.log("result = "+result);
    
    if(!result)
    {
      console.log("user not found");    
      res.status(200).send({ success: false, message: "User Not Found" })
    }
    else
    {
      var login_user = {email: result.username, password : result.password}
      console.log("user found ",login_user);
      console.log("process.env.JWT_SECRET = "+config.JWT_SECRET);
      var token = jwt.sign(login_user, config.JWT_SECRET || "", {
        expiresIn: 30000,
      });
      res.send({ success: true, token, user: login_user });
    }
   // res.send(result);    
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

