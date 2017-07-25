import resourcePickerOpen from './resourcePickerOpen';
import jwtToken from './jwtToken';
import selectedProducts from './selectedProducts';
import surveyBuilder from './surveyBuilder';
import { combineReducers } from 'redux';

const adminPanel = combineReducers({
  resourcePickerOpen,
  jwtToken,
  selectedProducts,
  surveyBuilder,
});

export default adminPanel;
