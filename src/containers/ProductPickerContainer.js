import { connect } from 'react-redux';
import ProductPicker from '../components/ProductPicker';
import { toggleProductPicker } from '../actions/productPicker';
import { setSelectedProducts, addSelectedProducts } from '../actions/selectedProducts';

const mapStateToProps = (state) => {
  return {
    open: state.productPicker.open,
    onSelectAction: state.productPicker.onSelectAction,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onSelect: (products, onSelectAction) => {
      if(onSelectAction === 'set') {
        dispatch(setSelectedProducts(products));
      } else {
        dispatch(addSelectedProducts(products))
      }
    },
    onToggle: (action) => {
      dispatch(toggleProductPicker(action));
    }
  };
}

const AdminPanelContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(ProductPicker);

export default AdminPanelContainer;
