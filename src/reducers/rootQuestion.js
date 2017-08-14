const initialState = {
  question: '',
  answerMapping: []
}

const rootQuestion = (state=initialState, action) => {
  switch(action.type) {
    case 'UPDATE_ROOT_QUESTION':
      return {
        question: action.question,
        answerMapping: action.answerMapping
      };
    default:
      return state;
  }
}

export default rootQuestion;