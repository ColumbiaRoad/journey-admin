import resourcePickerOpen from './resourcePickerOpen';
import jwtToken from './jwtToken';
import selectedProducts from './selectedProducts';
import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';

const adminPanel = combineReducers({
  resourcePickerOpen,
  jwtToken,
  selectedProducts,
  routing: routerReducer
});

export default adminPanel;
