## OAuth 2.0 - Node.js Sample App

The [Intuit Developer team](https://developer.intuit.com) has written this OAuth 2.0 Sample App in Node.js to provide working examples of OAuth 2.0 concepts, and how to integrate with Intuit endpoints.


### Getting Started

Before beginning, it may be helpful to have a basic understanding of OAuth 2.0 concepts.  There are plenty of tutorials and guides to get started with OAuth 2.0.

It is also expected that your development environment is properly set up for Node.js and NPM.

Note: this app was tested with Node.js versions v6.0.0, v7.0.0, and v8.0.0.

#### Setup

Clone the repository:
```
git clone https://github.com/IntuitDeveloper/oauth2-nodejs.git
```

Install NPM dependencies:
```
cd oauth2-nodejs
npm install
```

Launch your app:
```
node app.js
```

Your app should be running!  If you direct your browser to `https://localhost:3000`, you should see the welcome screen.  Please note - the app will not be fully functional until we finish configuring it.

### Configuring your app

All configuration for this app is located in `config.json`.  Locate and open this file.

We will need to update 3 items:

- `clientId`
- `clientSecret`
- `redirectUri`

All of these values must match **exactly** with what is listed in your app settings on [developer.intuit.com](https://developer.intuit.com).  If you haven't already created an app, you may do so there.  Please read on for important notes about client credentials, scopes, and redirect urls.

#### Client Credentials

Once you have created an app on Intuit's Developer Portal, you can find your credentials (Client ID and Client Secret) under the "Keys" section.  These are the values you'll have to copy into `config.json`.

#### Redirect URI

You'll have to set a Redirect URI in both `config.json` *and* the Developer Portal ("Keys" section).  With this app, the typical value would be `http://localhost:3000/callback`, unless you host this sample app in a different way (if you were testing HTTPS, for example).

**Note:** Using `localhost` and `http` will only work when developing, using the sandbox credentials.  Once you use production credentials, you'll need to host your app over `https`.

#### Scopes

While you are in `config.json`, you'll notice the scope sections.

```
  "scopes": {
    "sign_in_with_intuit": [
      "openid",
      ...
    ],
    "connect_to_quickbooks": [
      "com.intuit.quickbooks.accounting",
      "com.intuit.quickbooks.payment"
    ],
    "connect_handler": [
      "com.intuit.quickbooks.accounting",
      "com.intuit.quickbooks.payment",
      "openid",
      ...
    ]
  },
```
It is important to ensure that the scopes you are requesting match the scopes allowed on the Developer Portal.  For this sample app to work by default, your app on Developer Portal must support both Accounting and Payment scopes.  If you'd like to support Accounting only, simply remove the`com.intuit.quickbooks.payment` scope from `config.json`.

----------

### Run your app!

After setting up both Developer Portal and your `config.json`, try launching your app again!
```
node app.js
```
All flows should work.  The sample app supports the following flows:

**Sign In With Intuit** - this flow requests OpenID only scopes.  Feel free to change the scopes being requested in `config.json`.  After authorizing (or if the account you are using has already been authorized for this app), the redirect URL (`/callback`) will parse the JWT ID token, and make an API call to the user information endpoint.

**Connect To QuickBooks** - this flow requests non-OpenID scopes.  You will be able to make a QuickBooks API sample call (using the OAuth2 token) on the `/connected` landing page.

**Get App Now (Connect Handler)** - this flow requests both OpenID and non-OpenID scopes.  It simulates the request that would come once a user clicks "Get App Now" on the [apps.com](https://apps.com) website, after you publish your app.

----------

### Project Structure

In order to find the code snippets you are interested in, here is how the code is organized.

#### Launching the OAuth2 flow

Examples of launching the OAuth2 flow, including passing the right parameters and generating CSRF ant-forgery tokens, can be found in:

```
/routes/sign_in_with_intuit.js
/routes/connect_to_quickbooks.js
/routes/connect_handler.js
```

#### Callback URL

`/routes/callback.js` contains code snippets that receive the authorization code, make the bearer token exchange, and validate the JWT ID token (if applicable).  It then redirects to the post-connection landing page, `/routes/connected.js`.  

#### Connected
`/routes/connected.js` will make an example OpenID user information call over OAuth2 (assuming the openid scopes were requested).  Once loaded, the page allows you to make AJAX API calls over OAuth2.

#### API Calls

`/routes/api_call.js` allows three different API calls to be made over OAuth2:

- **QBO Call** - make an example accounting API call (note: this endpoint comes from `config.json`.  The endpoint is different for sandbox versus non-sandbox.  Make sure your `config.json` contains the correct endpoint!)
- **Refresh Call** - use the refresh token to get a new access token.
- **Revoke Call** - revoke the access token, so it no longer can access APIs.

View these code snippets to see how to correctly pass the access token or client credentials (depending on the API call).

#### JWT (ID Token)

`/tools/jwt.js` - For OpenID scopes, after exchanging the authorization code, you will receive a JWT (JSON Web Token) ID Token.  View this code snippet for an example of how to decode, and validate that the ID Token is secure.
