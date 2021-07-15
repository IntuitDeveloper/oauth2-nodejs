const router = require('express').Router();
const passport = require('passport');
const authCtrl = require('../controllers/authCtrl');
const auth = require("../middlewares/auth")
const successLoginUrl = "http://localhost:5500/login/success";
const errorLoginUrl = "http://localhost:5500/login/error";

router.get('/user', auth, (req, res) => {
  res.status(200).json(req.session.passport.user);
});

router.post('/getResetPassLink', authCtrl.sendResetLink);
router.post('/reset-password',authCtrl.resetPassword)
router.get('/logout', authCtrl.logoutUser);


// Should be changed with passport-local
router.post('/register', authCtrl.registerUser);
router.post('/login', authCtrl.loginUser);
// 


router.get('/google/callback', 
  passport.authenticate('google', { 
  failureRedirect: errorLoginUrl,
  successRedirect: successLoginUrl,
  }),
  function(req, res) {
    res.send("Thank you!")
  }
);

router.get('/google', 
  passport.authenticate('google', { scope : ['profile', 'email'] })
);
 

router.get('/facebook', passport.authenticate('facebook', {
 scope: ['public_profile']
}));

router.get('/facebook/callback',
 passport.authenticate('facebook', {
   successRedirect: successLoginUrl,
   failureRedirect: errorLoginUrl
 }));


module.exports = router;


