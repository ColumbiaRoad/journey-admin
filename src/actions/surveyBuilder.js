
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
