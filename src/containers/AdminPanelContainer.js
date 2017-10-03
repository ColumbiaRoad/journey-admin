import { connect } from 'react-redux';
import AdminPanel from '../components/AdminPanel';
import { toggleProductPicker } from '../actions/productPicker';
import { updateAllParsingReports, updateQuestionnaire } from '../actions/selectedProducts';
import { loadingError, dismissBanner } from '../actions/dataSource';

const mapStateToProps = (state) => {
  return {
    selectedProducts: state.selectedProducts,
    rootQuestion: state.rootQuestion,
    token: state.jwtToken,
    dataSource: state.dataSource
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
    },
    onLoadingError: () => {
      dispatch(loadingError());
    },
    onDismissBanner: () => {
      dispatch(dismissBanner());
    }
  };
}

const AdminPanelContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(AdminPanel);

export default AdminPanelContainer;
