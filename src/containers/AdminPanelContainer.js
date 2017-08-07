import { connect } from 'react-redux';
import AdminPanel from '../components/AdminPanel';
import { toggleProductPicker } from '../actions/productPicker';
import { setSelectedProducts, removeSelectedProduct, addSelectedProducts } from '../actions/selectedProducts';

const mapStateToProps = (state) => {
  return {
    open: state.productPicker.open,
    onSelection: state.productPicker.onSelection,
    token: state.jwtToken,
    selection: state.selectedProducts.length > 0,
    products: state.selectedProducts
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onToggle: (action) => {
      dispatch(toggleProductPicker(action));
    },
    onSelect: (products) => {
      if(state.productPicker.onSelection === 'set') {
        dispatch(setSelectedProducts(products));
      } else {
        dispatch(addSelectedProducts(products))
      }
    },
    onDelete: (id) => {
      dispatch(removeSelectedProduct(id));
    }
  };
}

const AdminPanelContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(AdminPanel);

export default AdminPanelContainer;
