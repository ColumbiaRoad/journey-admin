import React from 'react';
import ReactDOM from 'react-dom';
import AdminPanel from './components/AdminPanel';
import '@shopify/polaris/styles.css';
import { EmbeddedApp } from '@shopify/polaris/embedded';
import dotenv from 'dotenv';
import URLSearchParams from 'url-search-params';

dotenv.config();

const shop = new URLSearchParams(window.location.search).get('shop');
const shopOrigin = (shop) ? `https://${shop}` : undefined;
const apiKey = process.env.SHOPIFY_API_KEY;

ReactDOM.render(
  <EmbeddedApp
        apiKey={apiKey}
        shopOrigin={shopOrigin}
        forceRedirect
        debug
      > 
    <AdminPanel />
  </EmbeddedApp>,
  document.getElementById('root')
);
