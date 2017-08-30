import { createStore, applyMiddleware, compose } from 'redux';
import logger from 'redux-logger';
import { autoRehydrate, persistStore } from 'redux-persist';
import localForage from 'localforage';
import reducer from '../reducers/adminPanel';

export const getStore = () => {
  const store = compose(
    // applyMiddleware(logger),
    applyMiddleware(),
    autoRehydrate()
  )(createStore)(reducer);

  persistStore(store, { 
    storage: localForage,
    blacklist: ['jwtToken']
  });
  return store;
}