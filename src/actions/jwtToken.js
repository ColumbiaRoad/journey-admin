const setJwtToken = (token) => {
  return {
    type: 'SET_JWT_TOKEN',
    token: token
  };
};

export default setJwtToken;