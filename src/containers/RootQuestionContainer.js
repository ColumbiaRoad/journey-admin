import { connect } from 'react-redux';
import RootQuestion from '../components/RootQuestion';
import { updateRootQuestion } from '../actions/rootQuestion';

const mapStateToProps = (state) => {
  return {
    products: state.selectedProducts.map(selectedProduct => selectedProduct.product),
    questionItem: state.rootQuestion
  };
}

const mapDispatchToProps = (dispatch) => {
  return {
    onSave: (questionItem) => {
      dispatch(updateRootQuestion(questionItem));
    }
  };
}

const RootQuestionContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(RootQuestion);

export default RootQuestionContainer;