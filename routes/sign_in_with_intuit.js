var tools = require('../tools/tools.js')
var express = require('express')
var router = express.Router()

/** /sign_in_with_intuit **/
router.get('/', function (req, res) {
  // Set the OpenID scopes
  tools.setScopes('sign_in_with_intuit')

  // Constructs the authorization URI.
  var uri = tools.intuitAuth.code.getUri({
    // Add CSRF protection
    state: tools.generateAntiForgery(req.session)
  })

  // Redirect
  console.log('Redirecting to authorization uri: ' + uri)
  res.redirect(uri)
})

module.exports = router
