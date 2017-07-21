const resourcePickerOpen = (state = false, action) => {
  switch(action.type) {
    case 'TOGGLE_RESOURCE_PICKER_STATE':
      return !state;
    case 'SET_SELECTED_PRODUCTS':
      return false;
    default:
      return state;
  }
};

export default resourcePickerOpen;