import deepFreeze from 'deep-freeze';
import { sign, verify } from 'jsonwebtoken';
import { setJwtToken } from '../actions/jwtToken';
import jwtToken from './jwtToken';

describe('jwtToken', () => {
  it('set JWT token', () => {
    const beforeState = '';
    const token = sign('myPayload', 'superSecretKey')
    const action = setJwtToken(token);
    const afterState = token

    deepFreeze(beforeState);
    deepFreeze(action);
    expect(jwtToken(
      beforeState, action
    )).toEqual(afterState);
    expect(verify(
      afterState, 'superSecretKey'
    )).toEqual('myPayload');
  });

  it('handle uknown action', () => {
    const beforeState = '';
    const action = {
      foo: 'bar'
    };

    deepFreeze(beforeState);
    deepFreeze(action);
    expect(jwtToken(
      beforeState, action
    )).toEqual(beforeState);
  });
});