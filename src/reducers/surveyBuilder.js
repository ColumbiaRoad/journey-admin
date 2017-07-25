
const initialState = {
  product: {},
  current_step: 'INITIAL',
  questions: [''],
  answers: {},
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
    case 'SAVE_ANSWER_AND_VARIANT':
      const allAnswers = Object.assign({}, state.answers);
      if (allAnswers[action.question] === undefined) {
        allAnswers[action.question] = [];
      }
      let answerObj = allAnswers[action.question][action.answerID] || {};
      answerObj.answer = action.answer || answerObj.answer;
      answerObj.varant = action.variant || answerObj.variant;
      allAnswers[action.question][action.answerID] = answerObj;
      return Object.assign({}, state, {
        answers: allAnswers
      });
    default:
      return state;
  }
};

export default surveyBuilder;
