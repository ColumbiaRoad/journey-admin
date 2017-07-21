import React from 'react';
import ReactDOM from 'react-dom';
import AdminPanelContainer from './containers/AdminPanelContainer';
import reducer from './reducers/adminPanel';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import '@shopify/polaris/styles.css';
import { EmbeddedApp } from '@shopify/polaris/embedded';
import dotenv from 'dotenv';
import URLSearchParams from 'url-search-params';
import {
  BrowserRouter as Router,
  Route
} from 'react-router-dom'
import Page from './components/Page';

dotenv.config();

const shop = new URLSearchParams(window.location.search).get('shop');
const shopOrigin = (shop) ? `https://${shop}` : undefined;
const token = new URLSearchParams(window.location.search).get('token');
const apiKey = process.env.SHOPIFY_API_KEY;
const initialState = {
  resourcePickerOpen: false,
  jwtToken: token,
  selectedProducts: []
}

let store = createStore(reducer, initialState);

// Log every state change
store.subscribe(() =>
  console.log(store.getState())
)

ReactDOM.render(
  <Provider store={store}>
    <EmbeddedApp
          apiKey={apiKey}
          shopOrigin={shopOrigin}
          forceRedirect
          debug
        >
        <Router>
          <Route path="/" component={AdminPanelContainer} />
          <Route path="/page" component={Page} />
        </Router>
    </EmbeddedApp>
  </Provider>,
  document.getElementById('root')
);
