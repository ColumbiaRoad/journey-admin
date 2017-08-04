const resourcePickerOpen = (state = false, action) => {
  switch(action.type) {
    case 'TOGGLE_RESOURCE_PICKER_STATE':
      return !state;
    // Always close the resource picker after products have been selected
    case 'SET_SELECTED_PRODUCTS':
      return false;
    default:
      return state;
  }
};

export default resourcePickerOpen;