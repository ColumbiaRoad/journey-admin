import { connect } from 'react-redux';
import SelectedProductList from '../components/SelectedProductList';
import { removeAllSelectedProducts } from '../actions/selectedProducts';
import { toggleProductPicker } from '../actions/productPicker';

const mapStateToProps = (state) => {
  return {
    products: state.selectedProducts,
  };
}

const mapDispatchToProps = (dispatch) => {
  return {
    onDelete: () => {
      dispatch(removeAllSelectedProducts());
    },
    onAdd: () => {
      dispatch(toggleProductPicker('add'));
    }
  }
}

const SelectedProductListContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(SelectedProductList);

export default SelectedProductListContainer;
