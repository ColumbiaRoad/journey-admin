export const PARSING_ERRORS = {
  1000: 'empty question',
  1001: 'empty answer',
  1002: 'empty value',
  1003: 'answer maps to multiple values',
  1004: 'invalid value'
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
  let conclusion = { valid: true, questionError: 0, mappingErrors: [] };
  if(questionItem.question.length === 0) {
    conclusion = addQuestionError(conclusion, 1000);
  }
  const parsedMapping = {};

  for(const mapping of questionItem.answerMapping) {
    if(mapping.answer.length === 0) {
      conclusion = addMappingError(conclusion, { id: mapping.id, errorCode: 1001 });
    } else if (mapping.value.length === 0) {
      conclusion = addMappingError(conclusion, { id: mapping.id, errorCode: 1002 });
    } else if(parsedMapping.hasOwnProperty(mapping.answer)) {
      conclusion = addMappingError(conclusion, { id: mapping.id, errorCode: 1003, key: mapping.answer });
    } else if(!allowedValues.includes(mapping.value)) {
      conclusion = addMappingError(conclusion, { id: mapping.id, errorCode: 1004 });
    } else {
      parsedMapping[mapping.answer] = mapping.value;
    }
  };
  return conclusion;
}

function addQuestionError(conclusion, errorCode) {
  return {
    ...conclusion,
    valid: false,
    questionError: errorCode
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