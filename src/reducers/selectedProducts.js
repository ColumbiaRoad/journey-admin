import { setSelectedProducts } from '../actions/selectedProducts';

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
          })
        };
      });
    case 'ADD_SELECTED_PRODUCTS':
      // Merge old and new arrays using ES6 spread operator
      return [
        ...state,
        ...selectedProducts([], setSelectedProducts(action.selectedProducts))
      ];
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
    case 'REMOVE_SELECTED_PRODUCT':
      return state.filter((prod) => {
        return prod.product.id !== action.id;
      });
    case 'REMOVE_ALL_SELECTED_PRODUCTS':
      return [];
    default:
      return state;
  }
};

export default selectedProducts;
