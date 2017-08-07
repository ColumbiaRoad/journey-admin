import productPicker from './productPicker';
import jwtToken from './jwtToken';
import selectedProducts from './selectedProducts';
import { combineReducers } from 'redux';

const adminPanel = combineReducers({
  productPicker,
  jwtToken,
  selectedProducts,
});

export default adminPanel;
