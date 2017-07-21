export const setSelectedProducts = (selectedProducts) => {
  return {
    type: 'SET_SELECTED_PRODUCTS',
    selectedProducts: selectedProducts
  };
};

export const removeSelectedProduct = (id) => {
  return {
    type: 'REMOVE_SELECTED_PRODUCT',
    id: id
  }
}