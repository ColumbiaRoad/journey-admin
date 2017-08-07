import { connect } from 'react-redux';
import AdminPanel from '../components/AdminPanel';
import { toggleProductPicker } from '../actions/productPicker';

const mapStateToProps = (state) => {
  return {
    selection: state.selectedProducts.length > 0,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onToggle: (action) => {
      dispatch(toggleProductPicker(action));
    }
  };
}

const AdminPanelContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(AdminPanel);

export default AdminPanelContainer;
