export const PARSING_ERRORS = {
  2000: 'Question field cannot be empty',
  2001: 'Questions require at least one possible answer',
  1000: 'Answer field cannot be empty',
  1001: 'Value selection cannot be empty',
  1002: 'Answers must be unique',
  1003: 'Invalid value'
};

export function parseProductAnswerMappings(selectedProduct) {
  const result = {};
  for(const questionItem of selectedProduct.questions) {
    const allowedValues = selectedProduct.product.options
      .find(option => option.name === questionItem.option)
      .values;
    result[questionItem.option] = parseAnswerMapping(questionItem, allowedValues);
  }
  return result;
}

function parseAnswerMapping(questionItem, allowedValues) {
  // Group errors together because occur at the same time
  let conclusion = { valid: true, questionErrors: [], mappingErrors: [] };
  if(questionItem.question.length === 0 || questionItem.answerMapping.length === 0) {
    if(questionItem.question.length === 0) {
      conclusion = addQuestionError(conclusion, 2000);
    }
    if(questionItem.answerMapping.length === 0) {
      conclusion = addQuestionError(conclusion, 2001);
    }
  }
  const parsedMapping = {};

  for(const mapping of questionItem.answerMapping) {
    // Group errors together because occur at the same time
    if(mapping.answer.length === 0 || mapping.value.length === 0) {
      if(mapping.answer.length === 0) {
        conclusion = addMappingError(conclusion, { id: mapping.id, errorCode: 1000 });
      }
      if (mapping.value.length === 0) {
        conclusion = addMappingError(conclusion, { id: mapping.id, errorCode: 1001 });
      }
    } else if(parsedMapping.hasOwnProperty(mapping.answer)) {
      // Mark both mappings as erroneous
      conclusion = addMappingError(addMappingError(conclusion, 
        { id: parsedMapping[mapping.answer].id, errorCode: 1002}),
        { id: mapping.id, errorCode: 1002});
    } else if(!allowedValues.includes(mapping.value)) {
      conclusion = addMappingError(conclusion, { id: mapping.id, errorCode: 1003 });
    } else {
      parsedMapping[mapping.answer] = {
        id: mapping.id,
        value: mapping.value,
      }
    }
  };
  return conclusion;
}

function addQuestionError(conclusion, errorCode) {
  return {
    ...conclusion,
    valid: false,
    questionErrors: [
      ...conclusion.questionErrors,
      errorCode
    ]
  };
}

function addMappingError(conclusion, error) {
  return {
    ...conclusion,
    valid: false,
    mappingErrors: [
      ...conclusion.mappingErrors,
      error
    ]
  };
}