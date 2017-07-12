var tools = require('../tools/tools.js')
var jwt = require('../tools/jwt.js')
var express = require('express')
var router = express.Router()

/** /callback **/
router.get('/', function (req, res) {
  // Verify anti-forgery
  if(!tools.verifyAntiForgery(req.session, req.query.state)) {
    return res.send('Error - invalid anti-forgery CSRF response!')
  }


  // Exchange auth code for access token
  tools.intuitAuth.code.getToken(req.originalUrl).then(function (token) {
    // Store token - this would be where tokens would need to be
    // persisted (in a SQL DB, for example).
    tools.saveToken(req.session, token)
    req.session.realmId = req.query.realmId

    var errorFn = function(e) {
      console.log('Invalid JWT token!')
      console.log(e)
      res.redirect('/')
    }

    if(token.data.id_token) {
      try {
        // We should decode and validate the ID token
        jwt.validate(token.data.id_token, function() {
          // Callback function - redirect to /connected
          res.redirect('connected')
        }, errorFn)
      } catch (e) {
        errorFn(e)
      }
    } else {
      // Redirect to /connected
      res.redirect('connected')
    }
  }, function (err) {
    console.log(err)
    res.send(err)
  })
})

module.exports = router
