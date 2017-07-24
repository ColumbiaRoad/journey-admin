
const initialState = {
  product: {},
  current_step: 'INITIAL',
};

const surveyBuilder = (state = initialState, action) => {
  switch(action.type) {
    case 'GO_TO_SURVEY_QUESTION':
      return Object.assign({}, state, {
        product: action.product,
        current_step: 'SURVEY_QUESTION'
      });
    default:
      return state;
  }
};

export default surveyBuilder;
