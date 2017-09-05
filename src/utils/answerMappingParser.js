export const PARSING_ERRORS = {
  2000: 'Question field cannot be empty',
  2001: 'Questions require at least one possible answer',
  1000: 'Answer field cannot be empty',
  1001: 'Value selection cannot be empty',
  1002: 'Answers must be unique',
  1003: 'Invalid value'
};

/**
 * Parse all questions and answer mappings of the passed
 * product selection. The keys of the returned object are the
 * product IDs of the passed products.
 * @param {Array} selectedProducts
 * @returns {Object} parsing reports of all products
 */
export function parseProductSelectionAnswerMappings(selectedProducts) {
  const parsingReports = {};
  for(const selectedProduct of selectedProducts) {
    parsingReports[selectedProduct.product.id] = parseProductAnswerMappings(selectedProduct);
  }
  return parsingReports;
}

/**
 * Parse all product questions and answer mappings. The keys of the
 * the returned object are option names of the passed product.
 * @param {Object} selectedProduct
 * @returns {Object} parsing reports of all product questions
 */
export function parseProductAnswerMappings(selectedProduct) {
  const parsingReport = {};
  for(const questionItem of selectedProduct.questions) {
    const allowedValues = selectedProduct.product.options
      .find(option => option.name === questionItem.option)
      .values;
    parsingReport[questionItem.option] = parseAnswerMapping(questionItem, allowedValues);
  }
  return parsingReport;
}

/**
 * Parse single question and answer mapping. The returned
 * object contains separate lists of question and mapping
 * errors as well as a boolean describing the validity.
 * @param {Object} questionItem 
 * @param {Array} allowedValues
 * @returns {Object} parsing report
 */
export function parseAnswerMapping(questionItem, allowedValues) {
  // Group errors together because they might occur at the same time
  let report = { valid: true, questionErrors: [], mappingErrors: [] };
  if(questionItem.question.length === 0 || questionItem.answerMapping.length === 0) {
    if(questionItem.question.length === 0) {
      report = addQuestionError(report, 2000);
    }
    if(questionItem.answerMapping.length === 0) {
      report = addQuestionError(report, 2001);
    }
  }
  const parsedMapping = {};

  for(const mapping of questionItem.answerMapping) {
    // Group errors together because they might occur at the same time
    if(mapping.answer.length === 0 || mapping.value.length === 0) {
      if(mapping.answer.length === 0) {
        report = addMappingError(report, { id: mapping.id, errorCode: 1000 });
      }
      if (mapping.value.length === 0) {
        report = addMappingError(report, { id: mapping.id, errorCode: 1001 });
      }
    } else if(parsedMapping.hasOwnProperty(mapping.answer)) {
      // Mark both mappings as erroneous
      report = addMappingError(addMappingError(report, 
        { id: parsedMapping[mapping.answer].id, errorCode: 1002}),
        { id: mapping.id, errorCode: 1002});
    } else if(!allowedValues.includes(mapping.value)) {
      report = addMappingError(report, { id: mapping.id, errorCode: 1003 });
    } else {
      parsedMapping[mapping.answer] = {
        id: mapping.id,
        value: mapping.value,
      }
    }
  };
  return report;
}

/**
 * Returns updated report with validity set to false
 * and the passed error code added to question errors.
 * @param {Object} report 
 * @param {number} errorCode
 * @returns {Object} updated parsing report
 */
function addQuestionError(report, errorCode) {
  return {
    ...report,
    valid: false,
    questionErrors: [
      ...report.questionErrors,
      errorCode
    ]
  };
}

/**
 * Returns updated report with validity set to false
 * and the passed error code added to mapping errors.
 * @param {Object} report 
 * @param {number} errorCode
 * @returns {Object} updated parsing report
 */
function addMappingError(report, errorCode) {
  return {
    ...report,
    valid: false,
    mappingErrors: [
      ...report.mappingErrors,
      error
    ]
  };
}