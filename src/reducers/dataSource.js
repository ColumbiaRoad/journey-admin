import { isEmpty } from 'lodash';
import { REHYDRATE } from 'redux-persist/constants'

const initialState = {
  localData: false,
  localComplete: false,
  remoteData: false,
  remoteComplete: false,
  bannerDimissed: false
};

const dataSource = (state = initialState, action) => {
  switch (action.type) {
    case REHYDRATE:
      return {
        ...state,
        localComplete: true,
        localData: isEmpty(action.payload) ? false : true
      };
    case 'UPDATE_QUESTIONNAIRE':
        return {
          ...state,
          remoteData: true,
          remoteComplete: true
        };
    case 'LOADING_ERROR':
        return {
          ...state,
          remoteComplete: true
        };
    case 'DISMISS_DATA_SOURCE_BANNER':
        return {
          ...state,
          bannerDimissed: true
        };
    default:
        return state;
  }
};

export default dataSource;