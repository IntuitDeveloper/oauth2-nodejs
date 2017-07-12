var tools = require('../tools/tools.js')
var express = require('express')
var router = express.Router()

/** /connect_to_quickbooks **/
router.get('/', function (req, res) {
  // Set the Accounting + Payment scopes
  tools.setScopes('connect_to_quickbooks')

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
