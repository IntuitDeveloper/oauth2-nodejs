var tools = require('../tools/tools.js')
var express = require('express')
var router = express.Router()

/** /connect_handler **/
// This would be the endpoint that is called when "Get App Now" is clicked
// from apps.com
router.get('/', function (req, res) {
  // Set the OpenID + Accounting + Payment scopes
  tools.setScopes('connect_handler')

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
