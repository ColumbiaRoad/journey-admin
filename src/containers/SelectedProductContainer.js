import { connect } from 'react-redux';
import SelectedProduct from '../components/SelectedProduct';
import { removeSelectedProduct, updateParsingReport } from '../actions/selectedProducts';

const mapStateToProps = (state, ownProps) => {
  return {
    item: ownProps.item,
  };
}

const mapDispatchToProps = (dispatch) => {
  return {
    onDelete: (id) => {
      dispatch(removeSelectedProduct(id));
    },
    onUpdateParsingReport: (productParsingReport) => {
      dispatch(updateParsingReport(productParsingReport));
    }
  }
}

const SelectedProductListContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(SelectedProduct);

export default SelectedProductListContainer;
