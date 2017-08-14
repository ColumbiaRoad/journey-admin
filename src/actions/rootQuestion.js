export const updateRootQuestion = (questionItem) => {
  return {
    type: 'UPDATE_ROOT_QUESTION',
    question: questionItem.question,
    answerMapping: questionItem.answerMapping
  }
}