const selectedProducts = (state = [], action) => {
  switch(action.type) {
    case 'SET_SELECTED_PRODUCTS':
      return action.selectedProducts;
    case 'REMOVE_SELECTED_PRODUCT':
      return state.filter((p) => {
        return p.id !== action.id;
      });
    default:
      return state;
  }
};

export default selectedProducts;