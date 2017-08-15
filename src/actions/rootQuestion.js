export const updateRootQuestion = (questionItem) => {
  return {
    type: 'UPDATE_ROOT_QUESTION',
    question: questionItem.question,
    answerMapping: questionItem.answerMapping
  }
}

export const updateParsingReport = (parsingReport) => {
  return {
    type: 'UPDATE_ROOT_QUESTION_PARSING_REPORT',
    parsingReport: parsingReport
  }
}