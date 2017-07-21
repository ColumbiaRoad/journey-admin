import resourcePickerOpen from './resourcePickerOpen';
import jwtToken from './jwtToken';
import selectedProducts from './selectedProducts';
import { combineReducers } from 'redux';

const adminPanel = combineReducers({
  resourcePickerOpen,
  jwtToken,
  selectedProducts
});

export default adminPanel;