import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import AdminPanelContainer from './AdminPanelContainer';
import reducer from '../reducers/adminPanel';

const testStore = createStore(
  reducer,
);

// Change NODE_ENV to trigger full render
process.env.NODE_ENV = 'test';

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