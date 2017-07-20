const selectedProducts = (state = [], action) => {
  switch(action.type) {
    case 'SET_SELECTED_PRODUCTS':
      return action.selectedProducts;
    default:
      return state;
  }
};

export default selectedProducts;