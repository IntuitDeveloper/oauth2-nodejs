var atob = require('atob')
var expect = require('expect')
var request = require('request')
var tools = require('./tools')
var config = require('../config.json')

var JWT = function () {
  var jwt = this;

  // Performs the correct JWT validation steps
  this.validate = function(id_token, callback, errorFn) {
    // https://developer.api.intuit.com/.well-known/openid_configuration/
    var openid_configuration = tools.openid_configuration

    // Decode ID Token
    var token_parts = id_token.split('.')
    var idTokenHeader = JSON.parse(atob(token_parts[0]))
    var idTokenPayload = JSON.parse(atob(token_parts[1]))
    var idTokenSignature = atob(token_parts[2])

    // Step 1 : First check if the issuer is as mentioned in "issuer" in the discovery doc
    expect(idTokenPayload.iss).toEqual(openid_configuration.issuer)

    // Step 2 : check if the aud field in idToken is same as application's clientId
    expect(idTokenPayload.aud).toEqual(config.clientId)

    // Step 3 : ensure the timestamp has not elapsed
    expect(idTokenPayload.exp).toBeGreaterThan(Date.now() / 1000)

    // Step 4: Verify that the ID token is properly signed by the issuer
    jwt.getKeyFromJWKsURI(idTokenHeader.kid, function(key) {
      var cert = jwt.getPublicKey(key.n, key.e)
      // Validate the RSA encryption
      require("jsonwebtoken").verify(id_token, cert, function(err) {
        if(err) errorFn(err)
        else callback()
      })
    })
  }

  // Loads the correct key from JWKs URI:
  // https://oauth.platform.intuit.com/op/v1/jwks
  this.getKeyFromJWKsURI = function(kid, callback) {
    var openid_configuration = tools.openid_configuration

    request({
      url: openid_configuration.jwks_uri,
      json: true
    }, function(error, response, body) {
      if(error || response.statusCode != 200) {
        throw new Error("Could not reach JWK endpoint")
      }
      // Find the key by KID
      var key = body.keys.find(el => (el.kid == kid))
      callback(key)
    })
  }

  // Creates a PEM style RSA public key, using the modulus (n) and exponent (e)
  this.getPublicKey = function(modulus, exponent) {
    var getPem = require('rsa-pem-from-mod-exp')
    var pem = getPem(modulus, exponent)
    return pem
  }
}

module.exports = new JWT();
