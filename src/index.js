import React from 'react';
import ReactDOM from 'react-dom';
import AdminPanelContainer from './containers/AdminPanelContainer';
import { Provider } from 'react-redux';
import '@shopify/polaris/styles.css';
import { EmbeddedApp } from '@shopify/polaris/embedded';
import dotenv from 'dotenv';
import URLSearchParams from 'url-search-params';

import { setJwtToken } from './actions/jwtToken';
import { setSelectedProducts } from './actions/selectedProducts';
import { getStore } from './config/store';

dotenv.config();

const shop = new URLSearchParams(window.location.search).get('shop');
const shopOrigin = (shop) ? `https://${shop}` : undefined;
const token = new URLSearchParams(window.location.search).get('token');
const apiKey = process.env.REACT_APP_SHOPIFY_API_KEY;

const store = getStore();
store.dispatch(setJwtToken(token));

if (process.env.NODE_ENV !== 'development') {
  ReactDOM.render(
    <Provider store={store}>
      <EmbeddedApp
            apiKey={apiKey}
            shopOrigin={shopOrigin}
            forceRedirect
          >
          <AdminPanelContainer  />
      </EmbeddedApp>
    </Provider>,
    document.getElementById('root')
  );
} else {
  store.dispatch(setSelectedProducts(require('./products.json')));
  store.dispatch(setJwtToken(process.env.REACT_APP_JWT_TOKEN));
  ReactDOM.render(
    <Provider store={store}>
      <AdminPanelContainer  />
    </Provider>,
    document.getElementById('root')
  );
}
