import { connect } from 'react-redux';
import AdminPanel from '../components/AdminPanel';
import toggleResourcePickerState from '../actions/resourcePickerOpen';
import { setSelectedProducts, removeSelectedProduct } from '../actions/selectedProducts';

const mapStateToProps = (state) => {
  return {
    open: state.resourcePickerOpen,
    token: state.jwtToken,
    selection: state.selectedProducts.length > 0,
    products: state.selectedProducts
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onToggle: () => {
      dispatch(toggleResourcePickerState());
    },
    onSelect: (products) => {
      dispatch(setSelectedProducts(products));
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
