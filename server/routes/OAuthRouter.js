const router = require('express').Router();
var config = require('../config.json')
const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
const FacebookStrategy = require('passport-facebook').Strategy;
const sendEmail = require("./send_mail");
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


 router.post('/getResetPassLink', async (req,res) => {
  try{
    const { email } = req.body;
    if (!email) {
      return res.status(400).send({ error: 'Email is required' });
    }
    // const user = await User.findOne({ where: { email } });
    // if (!user) {
    //   return res.status(404).send({ error: 'User not found' });
    // }
    // const token = jwtToken.createToken(user);
    // const link = `${req.protocol}://localhost:5000/reset_password/${token}`;
    const token = "hii76east";
    const link = `${req.protocol}://localhost:5500/reset-password/${token}`;
    const  resp = await sendEmail(
      email,
      'ankitmyself2017@gmail.com',
      'Password Reset Link',
      `
      <div>Click the link below to reset your password</div><br/>
      <div>${link}</div>
      `
    );
    if(resp != 'Success'){
      throw new Error(resp);
    }else{
      return res.status(200).send({ message: 'Password reset link has been successfully sent to your inbox' });
    }
    }catch(err) {
        res.status(500).json({msg: err.message})
    }
 });

 router.post('/reset-password',async (req, res) => {
    const { password, confirmPassword,token } = req.body;
    console.log(password, confirmPassword,token);
    // const decoded = jwtToken.verifyToken(token);
    // const hash = hashPassword(password);
    // const updatedUser = await User.update(
    //   { password: hash },
    //   {
    //     where: { id: decoded.userId },
    //     returning: true,
    //     plain: true,
    //   }
    // );
    // const { id, name, email } = updatedUser[1];
    // return res.status(200).send({ token, user: { id, name, email } });
    return res.status(200).send({ msg: "Password changed!"});
  })



  
// router.get('/verify', userCtrl.verifiedToken);

module.exports = router;


