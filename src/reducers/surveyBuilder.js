
const initialState = {
  product: {},
  current_step: 'INITIAL',
  questions: ['']
};

const surveyBuilder = (state = initialState, action) => {
  switch(action.type) {
    case 'GO_TO_SURVEY_QUESTION':
      return Object.assign({}, state, {
        product: action.product,
        current_step: 'SURVEY_QUESTION'
      });
    case 'UPDATE_SURVEY_QUESTION':
      const betterQuestions = state.questions.slice();
      betterQuestions[action.id] = action.value;
      return Object.assign({}, state, {
        questions: betterQuestions
      });
    case 'PROCEED_TO_ANSWERS':
      return Object.assign({}, state, {
        current_step: 'ANSWER'
      });
    default:
      return state;
  }
};

export default surveyBuilder;
