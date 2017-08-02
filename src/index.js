import React from 'react';
import ReactDOM from 'react-dom';
import AdminPanelContainer from './containers/AdminPanelContainer';
import reducer from './reducers/adminPanel';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import '@shopify/polaris/styles.css';
import { EmbeddedApp } from '@shopify/polaris/embedded';
import dotenv from 'dotenv';
import URLSearchParams from 'url-search-params';
import ReduxThunk from 'redux-thunk';

import setJwtToken from './actions/jwtToken';
import { setSelectedProducts } from './actions/selectedProducts';

dotenv.config();

const shop = new URLSearchParams(window.location.search).get('shop');
const shopOrigin = (shop) ? `https://${shop}` : undefined;
const token = new URLSearchParams(window.location.search).get('token');
const apiKey = process.env.REACT_APP_SHOPIFY_API_KEY;

const store = createStore(
  reducer,
  applyMiddleware(ReduxThunk)
);

store.dispatch(setJwtToken(token));

// Log every state change
store.subscribe(() =>
  console.log(store.getState())
)

if (process.env.NODE_ENV !== 'development') {
  ReactDOM.render(
    <Provider store={store}>
      <EmbeddedApp
            apiKey={apiKey}
            shopOrigin={shopOrigin}
            forceRedirect
            debug
          >
          <AdminPanelContainer  />
      </EmbeddedApp>
    </Provider>,
    document.getElementById('root')
  );
} else {
  store.dispatch(setSelectedProducts(require('./products.json')));
  ReactDOM.render(
    <Provider store={store}>
      <AdminPanelContainer  />
    </Provider>,
    document.getElementById('root')
  );
}
