
export const goToSurveyQuestion = (product) => {
  return {
    type: 'GO_TO_SURVEY_QUESTION',
    product,
  }
}

export const updateQuestion = (id, value) => {
  return {
    type: 'UPDATE_SURVEY_QUESTION',
    id, value
  }
}

export const proceedToAnswers = () => {
  return {
    type: 'PROCEED_TO_ANSWERS',
  }
}

export const saveAnswerAndVariant = (question, answerID, answer, variant) => {
  return {
    type: 'SAVE_ANSWER_AND_VARIANT',
    question, answerID, answer, variant
  }
}

export const addNewAnswer = () => {
  return {
    type: 'INCREMENT_ANSWER_COUNT',
  }
}

export const saveModel = () => {
  //DO SOME async here!
  console.log('SAVING MODEL');
}
