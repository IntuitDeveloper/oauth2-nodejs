const Users = require('../models/userModel')
const {jwtToken, comparePassword, hashPassword} = require("../utils/token")
const sendEmail = require("../utils/send_mail")
const authCtrl = {
    registerUser: async (req,res) => {
        try{
            const {email,password} = req.body;
            const user = await Users.findOne({username:email})
            if(user) return res.status(400).send({msg: `This email already exists`})
            const passHash = await hashPassword(password);
            const newUser = new Users({
                username: email,
                password: passHash,
                created: Date.now()
            })
            await newUser.save()
            res.status(200).send({msg: `Signup Success`})
        }catch(err){
            res.status(500).send({msg: err.message})
        }
    },
    loginUser: async  (req,res) => {
        try{
            const {email,password} = req.body;
            const user = await Users.findOne({username:email})
            if(!user) return res.status(400).send({msg: `User does not exist`})
            // const isMatch = await comparePassword(password, user.password)
            const isMatch = (password == user.password)?true:false;
            if(!isMatch) return res.status(400).send({msg: `Wrong Password`})
            const payload = {email: user.username, password : user.password};
            const token = jwtToken.createToken(payload);
            res.send({ success: true, token, user: login_user });
        }catch(err){
            res.status(500).send({msg: err.message})
        }
    },
    sendResetLink: async  (req, res) => {
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
            res.status(500).send({msg: err.message})
        }
    },
    resetPassword: async  (req, res) => {
        const { password, confirmPassword, token } = req.body;
        console.log(password, confirmPassword, token);
        if(password != confirmPassword){
            return res.status(406).send({err: "Password and Confirm-Password should be same." })
        }
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
    },
    logoutUser: async  (req, res) => {
        req.logout();
        res.redirect('/');
    }
}

module.exports = authCtrl;