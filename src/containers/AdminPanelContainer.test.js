import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import ReduxThunk from 'redux-thunk';
import AdminPanelContainer from './AdminPanelContainer';
import reducer from '../reducers/adminPanel';

const testStore = createStore(
  reducer,
  applyMiddleware(ReduxThunk)
);

// Change NODE_ENV to trigger full render
process.env.NODE_ENV = 'testing';

describe('AdminPanelContainer', () => {
  it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(
        <Provider store={testStore}>
            <AdminPanelContainer />
        </Provider>,
        div
    );
  });
});