import deepFreeze from 'deep-freeze';
import productPicker from './productPicker';
import { toggleProductPicker } from '../actions/productPicker';
import { setSelectedProducts, addSelectedProducts } from '../actions/selectedProducts';

describe('resourcePickerOpen', () => {
  it('toggle resource picker state', () => {
    const beforeState = {
      open: false,
      onSelection: 'add'
    };
    const action = toggleProductPicker();
    const afterState = {
      ...beforeState,
      open: !beforeState.open
    };

    deepFreeze(beforeState);
    deepFreeze(action);
    expect(productPicker(
      beforeState, action
    )).toEqual(afterState);
  });

  it('react to product selection', () => {
    const beforeState = {
      open: true,
      onSelection: 'set'
    };
    const action = setSelectedProducts([]);
    const afterState = {
      ...beforeState,
      open: !beforeState.open
    };

    deepFreeze(beforeState);
    deepFreeze(action);
    expect(productPicker(
      beforeState, action
    )).toEqual(afterState);
  });

  it('react to adding new products', () => {
    const beforeState = {
      open: true,
      onSelection: 'add'
    };
    const action = addSelectedProducts([]);
    const afterState = {
      ...beforeState,
      open: !beforeState.open
    }

    deepFreeze(beforeState);
    deepFreeze(action);
    expect(productPicker(
      beforeState, action
    )).toEqual(afterState);
  });

  it('handle unknown action', () => {
    const beforeState = {
      open: false,
      onSelection: 'add'
    };
    const action = {
      foo: 'bar'
    };
    
    deepFreeze(beforeState);
    deepFreeze(action);
    expect(productPicker(
      beforeState, action
    )).toEqual(beforeState);
  });
});