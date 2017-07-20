import { connect } from 'react-redux';
import SelectedProductList from '../components/SelectedProductList';

const mapStateToProps = (state) => {
  return {
    products: state.selectedProducts
  };
}

export default connect(mapStateToProps)(SelectedProductList);