import { connect } from 'react-redux';
import SelectedProduct from '../components/SelectedProduct';
import { removeSelectedProduct } from '../actions/selectedProducts';

const mapStateToProps = (state, ownProps) => {
  return {
    item: ownProps.item,
  };
}

const mapDispatchToProps = (dispatch) => {
  return {
    onDelete: (id) => {
      dispatch(removeSelectedProduct(id));
    }
  }
}

const SelectedProductListContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(SelectedProduct);

export default SelectedProductListContainer;
