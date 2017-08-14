import productPicker from './productPicker';
import jwtToken from './jwtToken';
import selectedProducts from './selectedProducts';
import rootQuestion from './rootQuestion';
import { combineReducers } from 'redux';

const adminPanel = combineReducers({
  productPicker,
  jwtToken,
  selectedProducts,
  rootQuestion
});

export default adminPanel;
