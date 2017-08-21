import { connect } from 'react-redux';
import AdminPanel from '../components/AdminPanel';
import { toggleProductPicker } from '../actions/productPicker';
import { updateAllParsingReports } from '../actions/selectedProducts';

const mapStateToProps = (state) => {
  return {
    selectedProducts: state.selectedProducts,
    rootQuestion: state.rootQuestion
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onToggle: (action) => {
      dispatch(toggleProductPicker(action));
    },
    onSave: (allParsingReports) => {
      dispatch(updateAllParsingReports(allParsingReports));
    }
  };
}

const AdminPanelContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(AdminPanel);

export default AdminPanelContainer;
