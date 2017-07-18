import React from 'react';
// import URLSearchParams from 'url-search-params';
import {Page, Card, Banner } from '@shopify/polaris';
import { EmbeddedApp, ResourcePicker } from '@shopify/polaris/embedded';
import dotenv from 'dotenv';

dotenv.config();

const shop = new URLSearchParams(window.location.search).get('shop');
const shopOrigin = (shop) ? `https://${shop}` : undefined;
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
          <ResourcePicker
            products
            open
            onSelection={(resources) => {
              console.log('Selected products: ', resources.products);
              this.setState({open: false});
            }}
            onCancel={() => this.setState({open: false})}
          />
        </Page>
      </EmbeddedApp>
    );
  }
}
