import { connect } from 'react-redux';
import AdminPanel from '../components/AdminPanel';
import toggleResourcePickerState from '../actions/resourcePickerOpen';
import { setSelectedProducts } from '../actions/selectedProducts';

const mapStateToProps = (state) => {
  return {
    open: state.resourcePickerOpen,
    token: state.jwtToken,
    selection: state.selectedProducts.length > 0
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onToggle: () => {
      dispatch(toggleResourcePickerState());
    },
    onSelect: (products) => {
      dispatch(setSelectedProducts(products));
    }
  };
}

const AdminPanelContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(AdminPanel);

export default AdminPanelContainer;