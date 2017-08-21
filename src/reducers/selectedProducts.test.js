import deepFreeze from 'deep-freeze';
import selectedProducts from './selectedProducts';
import { 
  setSelectedProducts,
  removeSelectedProduct,
  updateProductQuestion,
  addSelectedProducts,
  removeAllSelectedProducts,
  updateParsingReport,
  updateAllParsingReports } from '../actions/selectedProducts';
import { parseProductAnswerMappings, parseProductSelectionAnswerMappings } from '../utils/answerMappingParser';

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
    }, {
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
  }, {
    id: 11346562004,
    options: [{
      id: 13979357588,
      name: "Flavour",
      position: 1,
      product_id: 11346562004,
      values: [
        "sweet",
        "sour",
        "bitter",
        "salty"
      ]
    }],
    tags: "Sale",
    title: "Third Product"
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
        }),
        parsingReport: {}
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

  it('add selected products', () => {
    const beforeState = selectedProducts([], setSelectedProducts(products.slice(0, 1)));
    const action = addSelectedProducts(products.slice(1));
    const afterState = selectedProducts([], setSelectedProducts(products));

    deepFreeze(beforeState);
    deepFreeze(action);
    expect(selectedProducts(
      beforeState, action
    )).toEqual(afterState);
  });


  it('add duplicate products', () => {
    const beforeState = selectedProducts([], setSelectedProducts(products.slice(0, 1)));
    const action = addSelectedProducts(products);
    const afterState = selectedProducts([], setSelectedProducts(products));

    deepFreeze(beforeState);
    deepFreeze(action);
    expect(selectedProducts(
      beforeState, action
    )).toEqual(afterState);
  });

  it('remove all selected products', () => {
    const beforeState = selectedProducts([], setSelectedProducts(products));
    const action = removeAllSelectedProducts();
    const afterState = [];

    deepFreeze(beforeState);
    deepFreeze(action);
    expect(selectedProducts(
      beforeState, action
    )).toEqual(afterState);
  });

  it('update product question', () => {
    const beforeState = selectedProducts([], setSelectedProducts(products));
    const questionItem = {
      option: products[0].options[0].name,
      question: 'How are you doing?',
      answerMapping: [
        {
          answer: 'Amazing',
          value: products[0].options[0].values[0]
        }
      ],
      productId: products[0].id
    }
    const action = updateProductQuestion(questionItem);
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

  it('update parsing report', () => {
    const questionItem1 = {
      option: products[1].options[0].name,
      question: 'How are you doing?',
      answerMapping: [
        {
          answer: 'Amazing',
          value: ''
        }
      ],
      productId: products[1].id
    };
    const questionItem2 = {
      option: products[1].options[1].name,
      question: '',
      answerMapping: [],
      productId: products[1].id
    };
    const beforeState = selectedProducts(
      selectedProducts(
      selectedProducts([], setSelectedProducts(products)),
      updateProductQuestion(questionItem1)),
      updateProductQuestion(questionItem2) 
    );
    const action = updateParsingReport({
      productId: questionItem1.productId,
      parsingReport: parseProductAnswerMappings(
        beforeState.find(item => item.product.id === questionItem1.productId)
      )
    });
    const afterState = beforeState.map((item) => {
      if(item.product.id === questionItem1.productId) {
        return {
          ...item,
          parsingReport: parseProductAnswerMappings(item)
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

  it('update all parsing reports', () => {
    const selection = [{
        product: {
          id: 11152897108,
          options: [{
              id: 13721029460,
              name: "Title",
              position: 1,
              product_id: 11152897108,
              values: ["Default Title"]
          }],
          tags: "Best Seller",
          title: "Another Product"
        },
        questions: [{
          answerMapping: [],
          option: "Title",
          question: ""
        }],
        parsingReport: {}
      }, {
        product: {
          id: 11346562004,
          options: [{
            id: 13979357588,
            name: "Title",
            position: 1,
            product_id: 11346562004,
            values: ["Default Title"]
          }],
          tags: "",
          title: "Third Product"
        },
        questions: [{
          answerMapping: [
            {id: "j6lutzp8", answer: "", value: ""}
          ],
          option: "Title",
          question: ""
        }],
        parsingReport: {}
      },{
        product: {
        id: 11152891412,
        options: [{
          id: 13721022036,
          name: "Size",
          position: 1,
          product_id: 11152891412,
          values: ["39", "40", "41", "42"]
        },{
          id: 13737062484,
          name: "Color",
          position:2,
          product_id: 11152891412,
          values: ["blue", "green", "yellow"]
        },{
          id:13737062548,
          name: "Material",
          position: 3,
          product_id: 11152891412,
          values: ["something", "something else"]
        }],
        tags: "Best Seller",
        title: "Test Product"
      },
      questions: [{
          answerMapping: [
            {id: "b3xe5369j63fnzeh", answer: "Tight fit", value: "39"},
            {id: "b3xe5369j63fnzei", answer: "Regular fit", value: "40"},
            {id: "b3xe5369j63fnzej", answer: "Loose fit", value: "42"}
          ],
          option: "Size",
          question: "What fit do you prefer?"
        }, {
          answerMapping: [
            {id: "b3xe5369j63fnzek", answer: "I want to have everybody's attention", value: "yellow"},
            {id: "b3xe5369j63fnzel", answer: "I'd rather blend in", value: "blue"}
          ],
          option: "Color",
          question: "Do you want to be seen or blend in?"
        }, {
          answerMapping: [
            {id: "b3xe5369j63fnzem", answer: "Yes", value: "something"},
            {id: "b3xe5369j63fnzen", answer: "No", value: "something else"}
          ],
          option: "Material",
          question: "Do you spend a lot of time outside?"
        }
      ],
      parsingReport: {}
    }];

    const beforeState = selection.slice();
    const parsingReports = parseProductSelectionAnswerMappings(selection)
    const action = updateAllParsingReports(parsingReports);
    const afterState = selection.map(item => {
      switch(item.product.id) {
        case 11152897108:
          return {
            ...item,
            parsingReport: {
              Title: {valid: false, questionErrors: [2000, 2001], mappingErrors: []}
            }
          };
        case 11346562004:
          return {
            ...item,
            parsingReport: {
                Title: {valid: false, questionErrors: [2000], mappingErrors: [
                  {id: 'j6lutzp8', errorCode: 1000},
                  {id: 'j6lutzp8', errorCode: 1001}
                ]}
            }
          };
        case 11152891412:
          return {
            ...item,
            parsingReport: {
              Size: {valid: true, questionErrors: [], mappingErrors: []},
              Color: {valid: true, questionErrors: [], mappingErrors: []},
              Material: {valid: true, questionErrors: [], mappingErrors: []}
            }
          };
        default:
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
