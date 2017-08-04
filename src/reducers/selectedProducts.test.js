import deepFreeze from 'deep-freeze';
import selectedProducts from './selectedProducts';
import { setSelectedProducts, removeSelectedProduct, addProductQuestion } from '../actions/selectedProducts';

const products = [{
    id: 11152897108,
    options: [{
      id: 13721029460,
      name: "Title",
      position: 1,
      product_id: 11152897108,
      values: [
        "Default Title"
      ]
    }],
    tags: "Best Seller",
    title: "Another Product"
  }, {
    id: 11152891412,
    options: [{
      id: 13721022036,
      name: "Size",
      position: 1,
      product_id: 11152891412,
      values: [
        "39",
        "40",
        "41",
        "42"
      ]
    },{
      id: 13737062484,
      name: "Color",
      position: 2,
      product_id: 11152891412,
      values: [
        "blue",
        "green",
        "yellow"
      ]
    }],
    tags: "Best Seller",
    title: "Test Product"
}]

describe('selectedProducts', () => {
  it('set selected products', () => {
    const beforeState = [];
    const action = setSelectedProducts(products);
    const afterState = products.map((prod) => {
      return {
        product: prod,
        questions: prod.options.map((option) => {
          return {
            option: option.name,
            question: '',
            answerMapping: []
          };
        })
      }
    });

    deepFreeze(beforeState);
    deepFreeze(action);
    expect(selectedProducts(
      beforeState, action
    )).toEqual(afterState);
  });

  it('remove selected product', () => {
    const beforeState = selectedProducts([], setSelectedProducts(products));
    const action = removeSelectedProduct(products[0].id);
    const afterState = selectedProducts([], setSelectedProducts(products.slice(1)));

    deepFreeze(beforeState);
    deepFreeze(action);
    expect(selectedProducts(
      beforeState, action
    )).toEqual(afterState);
  });

  it('add product question', () => {
    const beforeState = selectedProducts([], setSelectedProducts(products));
    const questionItem = {
      option: products[0].options[0].name,
      question: 'How are you doing?',
      answerMapping: [
        {
          answer: 'Amazing',
          mapping: products[0].options[0].values[0]
        }
      ],
      productId: products[0].id
    }
    const action = addProductQuestion(questionItem);
    const afterState = selectedProducts([], setSelectedProducts(products)).map((item) => {
      if(item.product.id === questionItem.productId) {
        return {
            ...item,
            questions: item.questions.map((q) => {
              if(q.option === questionItem.option) {
                return {
                  option: questionItem.option,
                  question: questionItem.question,
                  answerMapping: questionItem.answerMapping
                };
              } else {
                return q;
              }
            })
          };
        } else {
          return item;
        }
    });

    deepFreeze(beforeState);
    deepFreeze(action);
    expect(selectedProducts(
      beforeState, action
    )).toEqual(afterState);
  });

  it('handle unkown action', () => {
    const beforeState = selectedProducts([], setSelectedProducts(products));
    const action = {
      foo: 'bar'
    };

    deepFreeze(beforeState);
    deepFreeze(action);
    expect(selectedProducts(
      beforeState, action
    )).toEqual(beforeState);
  })
});
