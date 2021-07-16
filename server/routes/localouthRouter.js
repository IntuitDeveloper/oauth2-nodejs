const router = require('express').Router();
var config = require('../config.json');
const passport = require('passport');
var LocalStrategy  = require('passport-local').Strategy;
var connection     = require('../database/connection.js');
var jwt = require('jsonwebtoken');
const mongoose = require('mongoose');
const userSchema = require('../database/schema/userSchema.js');
const User_db = mongoose.model('user', userSchema, 'user');
const bcrypt = require('bcrypt');
const successLoginUrl = "http://localhost:5500/login/success";
const errorLoginUrl = "http://localhost:5500/login/error";

// { email: 'admin@gmail.com', password: 'Admin@1234' } 
var user_detail;
passport.use(
  new LocalStrategy(
  {
  usernameField: 'email',
  passwordField: 'password',
  },
  async (email, password, done) => { 
  const user = await VerifyUser(email, password);    
  console.log("result = "+user);  
  if(!user)
  {
    console.log("user not found");    
    done({ success: false, message: "User Not Found" });
    //return;
    //done({ type: 'email', message: 'No such user found' }, false);
  }
  var token;
  if (bcrypt.compareSync(password, user.password)) {
    token = jwt.sign(login_user, config.JWT_SECRET || "", {
      expiresIn: 30000,
    });      
    console.log("token is = "+token);
    done({ success: true, token, user: user });
    //return;
    //done(null, { id: user.id, userName: user.userName });
    } else {
        console.log("Password did not match");
        done({success: false, type: 'password', message: 'Password did not match' }, false);
    }  
  },
  ),
);

async function VerifyUser(username, password){
    console.log("username is = "+username);
    user_detail = await connection.then(async () => {
      return findUser(username, password);
    })
    return user_detail;
  }

// async function createUser(username, password) {
//     return new User({
//       username,   
//       password, 
//       created: Date.now()
//     }).save()
//   }
  
//   async function deleteUser(username) {
//     return User.remove({username})
//   }

async function findUser(username, password) {
  return await User_db.findOne({ username, password })
};

router.get('/', function(req, res){
    console.log("request is in get");
    console.log(req.params);
//  res.render('/login',{'message' :req.flash('message')});
});

router.post("/", passport.authenticate('local', {
    successRedirect: successLoginUrl,
    failureRedirect: errorLoginUrl,
    failureFlash: true
}), function(req, res, info){
    console.log("request is");
    console.log(req.params);   
   // res.render('/login',{'message' :req.flash('message')});
});

module.exports = router;