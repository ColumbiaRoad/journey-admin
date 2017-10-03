import deepFreeze from 'deep-freeze';
import { REHYDRATE } from 'redux-persist/constants'
import { updateQuestionnaire } from '../actions/selectedProducts';
import { loadingError, dismissBanner } from '../actions/dataSource';
import dataSource from './dataSource';

const initialState = {
  localData: false,
  localComplete: false,
  remoteData: false,
  remoteComplete: false,
  bannerDimissed: false
};

describe('dataSource', () => {
  it('handle non-empty rehydrate', () => {
    const beforeState = {...initialState};
    const action = {
      type: REHYDRATE,
      payload: {
        foo: 'bar'
      }
    };
    const afterState = {
      ...initialState,
      localData: true,
      localComplete: true
    };

    deepFreeze(beforeState);
    deepFreeze(action);
    expect(dataSource(
      beforeState, action
    )).toEqual(afterState);
  });

  it('ignore empty rehydrate', () => {
    const beforeState = {...initialState};
    const action = {
      type: REHYDRATE,
      payload: {}
    };
    const afterState = {
      ...initialState,
      localComplete: true
    };

    deepFreeze(beforeState);
    deepFreeze(action);
    expect(dataSource(
      beforeState, action
    )).toEqual(afterState);
  });

  it('handle received questionnaire', () => {
    const beforeState = {...initialState};
    const action = updateQuestionnaire({foo: 'bar'});
    const afterState = {
      ...initialState,
      remoteComplete: true,
      remoteData: true
    };

    deepFreeze(beforeState);
    deepFreeze(action);
    expect(dataSource(
      beforeState, action
    )).toEqual(afterState);
  });

  it('handle loading error', () => {
    const beforeState = {...initialState};
    const action = loadingError();
    const afterState = {
      ...initialState,
      remoteComplete: true
    };

    deepFreeze(beforeState);
    deepFreeze(action);
    expect(dataSource(
      beforeState, action
    )).toEqual(afterState);
  });

  it('handle banner dismiss', () => {
    const beforeState = {
      ...initialState,
      localData: true,
      localComplete: true,
      remoteData: false,
      remoteComplete: true,
    };
    const action = dismissBanner();
    const afterState = {
      ...initialState,
      localData: true,
      localComplete: true,
      remoteData: false,
      remoteComplete: true,
      bannerDimissed: true
    };

    deepFreeze(beforeState);
    deepFreeze(action);
    expect(dataSource(
      beforeState, action
    )).toEqual(afterState);
  });

  it('handle unknown action', () => {
    const beforeState = {...initialState};
    const action = {
      foo: 'bar'
    };
    const afterState = {...initialState};

    deepFreeze(beforeState);
    deepFreeze(action);
    expect(dataSource(
      beforeState, action
    )).toEqual(afterState);
  });
});