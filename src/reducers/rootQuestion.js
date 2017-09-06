const initialState = {
  question: '',
  answerMapping: [],
  parsingReport: {}
};

const rootQuestion = (state=initialState, action) => {
  switch(action.type) {
    case 'UPDATE_ROOT_QUESTION':
      return {
        ...state,
        question: action.question,
        answerMapping: action.answerMapping
      };
    case 'UPDATE_ROOT_QUESTION_PARSING_REPORT':
      return {
        ...state,
        parsingReport: action.parsingReport
      };
    case 'REMOVE_ALL_SELECTED_PRODUCTS':
      return initialState;
    case 'UPDATE_ALL_PARSING_REPORTS':
      return {
        ...state,
        parsingReport: action.parsingReports.rootQuestion
      };
    case 'UPDATE_QUESTIONNAIRE':
      return {
        ...state,
        ...action.questionnaire.rootQuestion,
        parsingReport: {}
      };
    default:
      return state;
  }
}

export default rootQuestion;