const initialState = {
  question: '',
  answerMapping: [],
  parsingReport: {}
}

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
      }
    default:
      return state;
  }
}

export default rootQuestion;