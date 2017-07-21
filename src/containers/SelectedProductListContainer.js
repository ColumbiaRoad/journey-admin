import { connect } from 'react-redux';
import SelectedProductList from '../components/SelectedProductList';
import { removeSelectedProduct } from '../actions/selectedProducts';
import { goToSurveyQuestion } from '../actions/surveyBuilder';

const mapStateToProps = (state) => {
  return {
    products: state.selectedProducts
  };
}

const mapDispatchToProps = (dispatch) => {
  return {
    onDelete: (id) => {
      dispatch(removeSelectedProduct(id));
    },
    proceedToSurveyQuestions: (product) => {
      dispatch(goToSurveyQuestion(product));
    }
  }
}

const SelectedProductListContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(SelectedProductList);

export default SelectedProductListContainer;
