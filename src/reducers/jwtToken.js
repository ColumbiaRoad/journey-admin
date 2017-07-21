const jwtToken = (state = '', action) => {
  switch (action.type) {
    case 'SET_JWT_TOKEN':
      return action.token;
    default:
      return state;
  }
};

export default jwtToken;