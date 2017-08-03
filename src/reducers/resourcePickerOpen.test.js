import deepFreeze from 'deep-freeze';
import resourcePickerOpen from './resourcePickerOpen';
import { toggleResourcePickerState } from '../actions/resourcePickerOpen';
import { setSelectedProducts } from '../actions/selectedProducts';

describe('resourcePickerOpen', () => {
  it('toggle resource picker state', () => {
    const beforeState = false;
    const action = toggleResourcePickerState();
    const afterState = !beforeState

    deepFreeze(beforeState);
    deepFreeze(action);
    expect(resourcePickerOpen(
      beforeState, action
    )).toEqual(afterState);
  });

  it('react to product selection', () => {
    const beforeState = true;
    const action = setSelectedProducts([]);
    const afterState = false;

    deepFreeze(beforeState);
    deepFreeze(action);
    expect(resourcePickerOpen(
      beforeState, action
    )).toEqual(afterState);
  });

  it('handle unknown action', () => {
    const beforeState = true;
    const action = {
      foo: 'bar'
    };
    
    deepFreeze(beforeState);
    deepFreeze(action);
    expect(resourcePickerOpen(
      beforeState, action
    )).toEqual(beforeState);
  });
});