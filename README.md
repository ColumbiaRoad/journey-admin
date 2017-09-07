# journey-admin

React application serving as frontend for our Journey Assistant Shopify app. This app is using Shopify's [Ploaris](https://polaris.shopify.com/components/get-started#app) as well as Shopify's [EASDK](https://github.com/Shopify/polaris/blob/master/documentation/Embedded%20apps.md) for embedded Shopify apps.

## Proxies
Proxy routes are configured in `static.json`, more info on how the file is structured can be found [here](https://github.com/heroku/heroku-buildpack-static).
#### `/auth/`
All requests sent to this endpoint will be proxied to the `/auth/` path of our [backend](https://github.com/ColumbiaRoad/journey-app). This is necessary because Shopify does not allow using different (sub)domains for the same app.

#### `/api/`
Similarly to the first proxy, requests sent to this endpoint will be proxied to the `/api/` path of our [backend](https://github.com/ColumbiaRoad/journey-app). This allows our React app to save questionnaires in our database as well as accessing Shopify's API. By doing this, no client secrets or Shopify access tokens are needed on the frontend.

## Configured Scripts
* `npm start` start server on port 3000
* `npm build` create production build in `/build`
* `npm test` run all tests (test files are of form `fileToTest.test.js`)
* `npm eject` eject to a custom setup

Check [here](https://github.com/facebookincubator/create-react-app) for more info on the configured scripts

## Environment variables
* REACT_APP_SHOPIFY_API_KEY: API key of your app's [credentials](https://help.shopify.com/api/getting-started/authentication/oauth#step-1-get-the-clients-credentials) (should be the same as you use on the backend)
* REACT_APP_BACKEND_URL: URL where your backend application is hosted, including protocol. **No trailing `/`!**

For development *only*:
* NODE_ENV: set this to 'development' to tell the app that it should not use Shopify's EASDK (embedded apps do not work locally)
* REACT_APP_JWT_TOKEN: Valid JWT token to make local development easier. A valid token for this instance would look like this:
```js
  {
    shop: shopUrl // Use whatever shop URL you use in your local database
    scope: 'api' // This is necessary to access the /api/ endpoint of our backend
  }
```
Check the [getJWTToken function](https://github.com/ColumbiaRoad/journey-app/blob/master/src/helpers/utils.js) to see how to generate a valid token.

**If you introduce new environment varibales, remember that they have to start with `REACT_APP_` to be accessible to your code**

## Local setup
* Run `npm install` to install dependencies
* Create `.env` file according to `.env-template`
* Create a `products.json` on the same level as `index.js` (in `/src`) to imitate selected products
* Start your backend application if it is not running already

## Heroku setup
* Create app on Heroku with [custom buildpack](https://github.com/mars/create-react-app-buildpack):
```bash
heroku create $APP_NAME --buildpack https://github.com/mars/create-react-app-buildpack.git --region eu
```
* Configure environment varibales according to `.env-template`
* Deploy code to Heroku: `git push heroku`

