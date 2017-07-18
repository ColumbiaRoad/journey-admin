import React from 'react';
// import URLSearchParams from 'url-search-params';
import {Page, Card, Banner } from '@shopify/polaris';
import { EmbeddedApp, Alert } from '@shopify/polaris/embedded';
import dotenv from 'dotenv';

dotenv.config();

// const shop = new URLSearchParams(window.location.search).get('shop');
// const shopOrigin = (shop) ? `https://${shop}` : undefined;
// const apiKey = new URLSearchParams(window.location.search).get('apiKey');
const shopOrigin = 'https://max-tutorial-app-store.myshopify.com';
const apiKey = process.env.SHOPIFY_API_KEY;


export default class MyApp extends React.Component {
  render() {
    return (
      <EmbeddedApp
        apiKey={apiKey}
        shopOrigin={shopOrigin}
        forceRedirect
        debug
      >
        <Page title="Example application">

          <Banner title="Yay it worked!">
            <p>The embedded polaris app has been successfully loaded</p>
          </Banner>

          <Card sectioned>
            <p>
              Go to <strong>http://localhost:3000/login?shop=&lt;your-shop&gt;.myshopify.com&apiKey=&lt;your-app-api-key&gt;</strong> to see how your embedded app work with Polaris
            </p>
            <br/>
            <p>
              Insert the rest of your app here, including those components detailed below, which can now communicate with the Embedded App SDK.
            </p>
          </Card>

          <Alert
            title="Accept terms and conditions"
            open
            confirmContent="I accept"
            onConfirm={() => this.setState({open: false, confirmed: true})}
          >
            You must accept the terms and conditions before proceeding.
          </Alert>
        </Page>
      </EmbeddedApp>
    );
  }
}
