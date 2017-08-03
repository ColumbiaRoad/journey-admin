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