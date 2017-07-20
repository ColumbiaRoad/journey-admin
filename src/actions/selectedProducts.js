const setSelectedProducts = (selectedProducts) => {
  return {
    type: 'SET_SELECTED_PRODUCTS',
    selectedProducts: selectedProducts
  };
};

export default setSelectedProducts;