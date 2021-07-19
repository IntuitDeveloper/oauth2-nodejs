const Users = require('../models/userModel')
// const jwtToken = require("../utils/token")
const sendEmail = require("../utils/send_mail")
const bcrypt = require('bcryptjs');
const passport = require('passport');
const jwt = require('jsonwebtoken');
const config = require("../config.json")

const authCtrl = {
    registerUser: async (req,res) => {
        try{
            const {
                fName,
                lName,
                email,
                password,
                company,
                mNumber
            } = req.body;
            const user = await Users.findOne({email: email})
            if(user) return res.send({success: false, msg: `This email already exists`})

            const token = await jwt.sign({fName,
                lName,
                email,
                password,
                company,
                mNumber},config.JWT_SECRET || '',{ expiresIn: '20m' });
            const link = `${req.protocol}://localhost:3000/auth/activate-account/?token=${token}`;
            
            const  resp = await sendEmail(
                email,
                'ankitmyself2017@gmail.com',
                'Account Activation Link',
                `
                <div>Click the link below to activate your account.</div><br/>
                <div>${link}</div>
                `
            );
            if(resp != true){
                throw new Error(resp);
            }else{
            res.status(200).send({success: true ,msg: `Email verification link sent to mail.`})
          }
        }catch(err){
            res.send({success: false, msg: err.message})
        }
    },
    loginUser: async (req, res, next) => {
        passport.authenticate("local", (err, user, info) => {
          if (err){
            throw err;
          } 
          if(!user){
            res.json(info)
          }
          else {
              res.json(user)
          }
        })(req, res, next);
      },
    sendResetLink: async  (req, res) => {
        try{
            const { email } = req.body;
            if (!email) {
                return res.status(400).send({success: false, msg: 'Email is required' });
            }
            const user = await Users.findOne({ email: email });
            if (!user) {
              return res.status(404).send({ success: false, msg: 'User not found' });
            }
            const token = await jwt.sign({email: user.email},config.JWT_SECRET || '',{ expiresIn: '20m' });
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
            if(resp != true){
                throw new Error(resp);
            }else{
                return res.status(200).json({success: true, msg: 'Password reset link has been successfully sent to your mail' });
            }
        }catch(err) {
            res.status(500).send({success: false, msg: err.message})
        }
    },
    resetPassword: async  (req, res) => {
        const { password, confirmPassword, token } = req.body;
        if(!token){
            return res.status(401).send({success: false, msg:  "Reset Token Missing" })
        }
        if(password != confirmPassword){
            return res.status(406).send({success: false, msg: "Password and Confirm-Password should be same." })
        }
        try{
        const decoded = await jwt.verify(token, config.JWT_SECRET);
        const hash = await bcrypt.hash(password, 10);
        const updatedUser = await Users.findOneAndUpdate({email: decoded.email}, {password: hash},{new: true});
        console.log(updatedUser)
        return res.status(200).send({success: true, msg: "Password changed. Please Login."});
        }catch(err){
            return  res.status(401).send({success: false, msg: err.message})
        }
    },
    activateAccount: async (req,res) => {
        const token = req.query.token;
        if(!token){
            return res.status(401).send({success: false, msg:  "Token Missing" })
        }
        try{
            const decoded = await jwt.verify(token, config.JWT_SECRET);
            const {
                fName,
                lName,
                email,
                password,
                company,
                mNumber
            } = decoded;
            const user = await Users.findOne({email: email})
            if(user) return res.status(401).send({success: false, msg: `This email already exists`})
            const passHash = await bcrypt.hash(password, 10);
            const newUser = new Users({
                firstName: fName,
                lastName: lName,
                email: email,
                username: email,
                password: passHash,
                details: {
                    company: company,
                    mobile: mNumber
                }
            })
            await newUser.save()
            // res.status(200).send({success: true ,msg: `Signup Success.`})
            res.redirect('http://localhost:5500/login');
            }catch(err){
                return  res.status(401).send({success: false, msg: err.message})
            }
    },
    logoutUser: async  (req, res) => {
        req.logout();
        res.redirect('/');
    }
}

module.exports = authCtrl;