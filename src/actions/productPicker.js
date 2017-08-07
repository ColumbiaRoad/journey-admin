export const toggleProductPicker = (onSelectAction) => {
  return {
    type: 'TOGGLE_PRODUCT_PICKER_STATE',
    onSelectAction: onSelectAction
  };
};