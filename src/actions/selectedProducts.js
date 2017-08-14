export const setSelectedProducts = (selectedProducts) => {
  return {
    type: 'SET_SELECTED_PRODUCTS',
    selectedProducts: selectedProducts
  };
};

export const removeSelectedProduct = (id) => {
  return {
    type: 'REMOVE_SELECTED_PRODUCT',
    id: id
  }
}

export const addSelectedProducts = (selectedProducts) => {
  return {
    type: 'ADD_SELECTED_PRODUCTS',
    selectedProducts: selectedProducts
  }
}

export const removeAllSelectedProducts = () => {
  return {
    type: 'REMOVE_ALL_SELECTED_PRODUCTS'
  }
}

export const updateProductQuestion = (questionItem) => {
  return {
    type: 'UPDATE_PRODUCT_QUESTION',
    option: questionItem.option,
    question: questionItem.question,
    answerMapping: questionItem.answerMapping,
    productId: questionItem.productId
  }
}

export const updateParsingReport = (prodcutParsingReport) => {
  return {
    type: 'UPDATE_PRODUCT_PARSING_REPORT',
    productId: prodcutParsingReport.productId,
    parsingReport: prodcutParsingReport.parsingReport
  }
}