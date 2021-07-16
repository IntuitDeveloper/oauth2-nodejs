// const jwt = require('jsonwebtoken')

const auth = (req,res,next) => {
    if (req.session.passport.user) {
        next();
    }else {
        res.status(401).send("You must login first!");
    }
}

module.exports = auth;