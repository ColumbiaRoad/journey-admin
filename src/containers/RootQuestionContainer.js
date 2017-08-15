import { connect } from 'react-redux';
import RootQuestion from '../components/RootQuestion';
import { updateRootQuestion, updateParsingReport } from '../actions/rootQuestion';

const mapStateToProps = (state) => {
  return {
    products: state.selectedProducts.map(selectedProduct => selectedProduct.product),
    questionItem: state.rootQuestion
  };
}

const mapDispatchToProps = (dispatch) => {
  return {
    onUpdate: (questionItem) => {
      dispatch(updateRootQuestion(questionItem));
    },
    onSave: (parsingReport) => {
      dispatch(updateParsingReport(parsingReport));
    }
  };
}

const RootQuestionContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(RootQuestion);

export default RootQuestionContainer;