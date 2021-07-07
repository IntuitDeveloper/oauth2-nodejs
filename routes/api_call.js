var tools = require('../tools/tools.js')
var config = require('../config.json')
var request = require('request')
var express = require('express')
var router = express.Router()

/** /api_call **/
router.get('/', function (req, res) {
  var token = tools.getToken(req.session)
  if(!token) return res.json({error: 'Not authorized'})
  if(!req.session.realmId) return res.json({
    error: 'No realm ID.  QBO calls only work if the accounting scope was passed!'
  })

  // Set up API call (with OAuth2 accessToken)
  var url = config.api_uri + req.session.realmId + '/companyinfo/' + req.session.realmId
  console.log('Making API call to: ' + url)
  var requestObj = {
    url: url,
    headers: {
      'Authorization': 'Bearer ' + token.accessToken,
      'Accept': 'application/json'
    }
  }

  // Make API call
  request(requestObj, function (err, response) {
    // Check if 401 response was returned - refresh tokens if so!
    tools.checkForUnauthorized(req, requestObj, err, response).then(function ({err, response}) {
      if(err || response.statusCode != 200) {
        return res.json({error: err, statusCode: response.statusCode})
      }

      // API Call was a success!
      res.json(JSON.parse(response.body))
    }, function (err) {
      console.log(err)
      return res.json(err)
    })
  })
})

/** /api_call/revoke **/
router.get('/revoke', function (req, res) {
  var token = tools.getToken(req.session)
  if(!token) return res.json({error: 'Not authorized'})

  var url = tools.revoke_uri
  request({
    url: url,
    method: 'POST',
    headers: {
      'Authorization': 'Basic ' + tools.basicAuth,
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      'token': token.accessToken
    })
  }, function (err, response, body) {
    if(err || response.statusCode != 200) {
      return res.json({error: err, statusCode: response.statusCode})
    }
    tools.clearToken(req.session)
    res.json({response: "Revoke successfully"})
  })
})

/** /api_call/refresh **/
// Note: typical use case would be to refresh the tokens internally (not an API call)
// We recommend refreshing upon receiving a 401 Unauthorized response from Intuit.
// A working example of this can be seen above: `/api_call`
router.get('/refresh', function (req, res) {
  var token = tools.getToken(req.session)
  if(!token) return res.json({error: 'Not authorized'})

  tools.refreshTokens(req.session).then(function(newToken) {
    // We have new tokens!
    res.json({
      accessToken: newToken.accessToken,
      refreshToken: newToken.refreshToken
    })
  }, function(err) {
    // Did we try to call refresh on an old token?
    console.log(err)
    res.json(err)
  })
})


/** /api_call/getCustomer **/
router.get('/getCustomer', function (req, res) {
  var token = tools.getToken(req.session)
  if(!token) return res.json({error: 'Not authorized'})
  
   var url = config.api_uri + req.session.realmId + '/customer/58?minorversion=59/' + req.session.realmId
  console.log("API call for getting customer "+url);
  getrequestonAPI(url,req,token,res);
})

/** /api_call/getAllInvoices **/
router.get('/getAllInvoices', function (req, res) {
  var token = tools.getToken(req.session)
  if(!token) return res.json({error: 'Not authorized'})
   var query = "select * from Invoice";
   var url = config.api_uri + req.session.realmId + '/query?query='+query+'&minorversion=59/' + req.session.realmId
  console.log("API call for getting invoices "+url);
  getrequestonAPI(url,req,token,res);
})

/** /api_call/getAllInvoices **/
router.get('/getInvoice', function (req, res) {
  var token = tools.getToken(req.session)
  if(!token) return res.json({error: 'Not authorized'})  
   var url = config.api_uri + req.session.realmId + '/invoice/195?minorversion=59/' + req.session.realmId
  console.log("API call for getting invoices "+url);
  getrequestonAPI(url,req,token,res);
})

/** /api_call/create customer **/
router.get('/createCustomer/:customer', function (req, res) {
  var token = tools.getToken(req.session) 
  if(!token) return res.json({error: 'Not authorized'}) 
  console.log("customer is");
  console.log(req.params); 
  
   var url = config.api_uri + req.session.realmId + '/'+JSON.stringify(req.params.customer)+'?minorversion=59/' + req.session.realmId
  console.log("API call creating customer "+url);
  postrequestonAPI(url, req, token, res);
})

/** common function for sending get calls on API **/
function getrequestonAPI(request_url, req, token,res)
{
  var requestObj = {
    url: request_url,
    headers: {
      'Authorization': 'Bearer ' + token.accessToken,
      'Accept': 'application/json'
    }
  }
   // Make API call
   request(requestObj, function (err, response) {
    // Check if 401 response was returned - refresh tokens if so!
    tools.checkForUnauthorized(req, requestObj, err, response).then(function ({err, response}) {
      if(err || response.statusCode != 200) {
        return res.json({error: err, statusCode: response.statusCode})
      }
      // API Call was a success!
      res.json(JSON.parse(response.body))
    }, function (err) {
      console.log(err)
      return res.json(err)
    })
  })
}

/** common function for sending post calls on API **/
function postrequestonAPI(request_url, req, token, res)
{  
  request({
    url: request_url,
    method: 'POST',
    headers: {
      'Authorization': 'Basic ' + tools.basicAuth,
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      'token': token.accessToken
    })
  }, function (err, response, body) {
    if(err || response.statusCode != 200) {
      return res.json({error: err, statusCode: response.statusCode})
    }
    tools.clearToken(req.session)
    res.json({response: "Request completed sucessfully"})
  })
}


module.exports = router
