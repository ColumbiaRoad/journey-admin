import { connect } from 'react-redux';
import SelectedProductOption from '../components/SelectedProductOption';
import { addProductQuestion } from '../actions/selectedProducts';

const mapStateToProps = (state, ownProps) => {
  return {
    option: ownProps.option,
    productId: ownProps.productId
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
