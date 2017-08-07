export const toggleProductPicker = (onSelection) => {
  return {
    type: 'TOGGLE_PRODUCT_PICKER_STATE',
    onSelection: onSelection
  };
};