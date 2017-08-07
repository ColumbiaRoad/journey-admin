const productPicker = (state = {}, action) => {
  switch(action.type) {
    case 'TOGGLE_PRODUCT_PICKER_STATE':
      return {
        open: !state.open,
        onSelection: action.onSelection ? action.onSelection : state.onSelection
      };
    // Always close the resource picker after products have been selected
    case 'SET_SELECTED_PRODUCTS':
    case 'ADD_SELECTED_PRODUCTS':
      return {
        ...state,
        open: false
      }
    default:
      return state;
  }
};

export default productPicker;