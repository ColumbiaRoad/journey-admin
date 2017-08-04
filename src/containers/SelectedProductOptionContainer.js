import { connect } from 'react-redux';
import SelectedProductOption from '../components/SelectedProductOption';
import { addProductQuestion } from '../actions/selectedProducts';

const mapStateToProps = (state, ownProps) => {
  const questionItem = state
    .selectedProducts
    .find(e => e.product.id === ownProps.productId)
    .questions
    .find(q => q.option === ownProps.option.name);

  return {
    option: ownProps.option,
    productId: ownProps.productId,
    questionItem: questionItem
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    onSave: (questionItem) => {
      dispatch(addProductQuestion(questionItem));
    }
  }
}

const SelectedProductOptionContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(SelectedProductOption);

export default SelectedProductOptionContainer;
