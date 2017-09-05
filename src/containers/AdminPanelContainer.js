import { connect } from 'react-redux';
import AdminPanel from '../components/AdminPanel';
import { toggleProductPicker } from '../actions/productPicker';
import { updateAllParsingReports, updateQuestionnaire } from '../actions/selectedProducts';

const mapStateToProps = (state) => {
  return {
    selectedProducts: state.selectedProducts,
    rootQuestion: state.rootQuestion,
    token: state.jwtToken
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onToggle: (action) => {
      dispatch(toggleProductPicker(action));
    },
    onSave: (allParsingReports) => {
      dispatch(updateAllParsingReports(allParsingReports));
    },
    onQuestionnaire: (questionnaire) => {
      dispatch(updateQuestionnaire(questionnaire));
    }
  };
}

const AdminPanelContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(AdminPanel);

export default AdminPanelContainer;
