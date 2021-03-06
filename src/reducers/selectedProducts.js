import { setSelectedProducts } from '../actions/selectedProducts';
import { uniqBy } from 'lodash'

const question = (state = {}, action) => {
  switch(action.type) {
    case 'UPDATE_PRODUCT_QUESTION':
      return {
        option: action.option,
        question: action.question,
        answerMapping: action.answerMapping
      }
    default:
      return state;
  }
};

const selectedProducts = (state = [], action) => {
  switch(action.type) {
    case 'SET_SELECTED_PRODUCTS':
      return action.selectedProducts.map((prod) => {
        return {
          product: prod,
          questions: prod.options.map((option) => {
            // Upon creation create a question item for each option,
            // this makes adding new questions/answers more straightforward
            return {
              option: option.name,
              question: '',
              answerMapping: []
            }
          }),
          parsingReport: {}
        };
      });
    case 'ADD_SELECTED_PRODUCTS':
      // Merge old and new arrays using ES6 spread operator
      return uniqBy([
        ...state,
        ...selectedProducts([], setSelectedProducts(action.selectedProducts))
      ], selectedProduct => selectedProduct.product.id);
    case 'UPDATE_PRODUCT_QUESTION':
      return state.map((item) => {
        if(item.product.id === action.productId) {
          return {
            ...item,
            questions: item.questions.map((q) => {
              if(q.option === action.option) {
                return question(undefined, action);
              } else {
                return q;
              }
            })
          };
        } else {
          return item;
        }
      });
    case 'UPDATE_PRODUCT_PARSING_REPORT':
      return state.map((item) => {
        if(item.product.id === action.productId) {
          return {
            ...item,
            parsingReport: action.parsingReport
          };
        } else {
          return item;
        }
      });
    case 'UPDATE_ALL_PARSING_REPORTS':
      return state.map((item) => {
        return {
          ...item,
          parsingReport: action.parsingReports[item.product.id]
        };
      });
    case 'REMOVE_SELECTED_PRODUCT':
      return state.filter((prod) => {
        return prod.product.id !== action.id;
      });
    case 'REMOVE_ALL_SELECTED_PRODUCTS':
      return [];
    case 'UPDATE_QUESTIONNAIRE':
      return action.questionnaire.selectedProducts.map((item) => {
        return {
          ...item,
          parsingReport: {}
        };
      });
    default:
      return state;
  }
};

export default selectedProducts;
