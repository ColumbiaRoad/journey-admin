import productPicker from './productPicker';
import jwtToken from './jwtToken';
import selectedProducts from './selectedProducts';
import rootQuestion from './rootQuestion';
import dataSource from './dataSource';
import { combineReducers } from 'redux';

const adminPanel = combineReducers({
  productPicker,
  jwtToken,
  selectedProducts,
  rootQuestion,
  dataSource
});

export default adminPanel;
