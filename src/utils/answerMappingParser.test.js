import deepFreeze from 'deep-freeze';
import { parseProductAnswerMappings } from './answerMappingParser';

const selectedProductValid = {
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
  ]
}

describe('answerMappingParser', () => {
  it('parse valid mapping', () => {
    const selectedProduct = {...selectedProductValid};
    const expectedConclusion = {
      Size: {valid: true, questionError: 0, mappingErrors: []},
      Color: {valid: true, questionError: 0, mappingErrors: []},
      Material: {valid: true, questionError: 0, mappingErrors: []}
    };

    deepFreeze(selectedProduct);
    expect(parseProductAnswerMappings(selectedProduct))
      .toEqual(expectedConclusion);
  });
  
  it('detect empty question field', () => {
    const selectedProduct = {
      ...selectedProductValid,
      questions: [{
          answerMapping: [
            {id: "b3xe5369j63fnzeh", answer: "Tight fit", value: "39"},
            {id: "b3xe5369j63fnzei", answer: "Regular fit", value: "40"},
            {id: "b3xe5369j63fnzej", answer: "Loose fit", value: "42"}
          ],
          option: "Size",
          question: ""
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
      ]
    };
    const expectedConclusion = {
      Size: {valid: false, questionError: 1000, mappingErrors: []},
      Color: {valid: true, questionError: 0, mappingErrors: []},
      Material: {valid: true, questionError: 0, mappingErrors: []}
    };

    deepFreeze(selectedProduct);
    expect(parseProductAnswerMappings(selectedProduct))
      .toEqual(expectedConclusion);
  });

  it('detect empty answer', () => {
    const selectedProduct = {
      ...selectedProductValid,
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
            {id: "b3xe5369j63fnzel", answer: "", value: "blue"}
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
      ]  
    };
    const expectedConclusion = {
      Size: {valid: true, questionError: 0, mappingErrors: []},
      Color: {valid: false, questionError: 0, mappingErrors: [
        { id: "b3xe5369j63fnzel", errorCode: 1001}
      ]},
      Material: {valid: true, questionError: 0, mappingErrors: []}
    };

    deepFreeze(selectedProduct);
    expect(parseProductAnswerMappings(selectedProduct))
      .toEqual(expectedConclusion);
  });

  it('detect empty value', () => {
    const selectedProduct = {
      ...selectedProductValid,
      questions: [{
          answerMapping: [
            {id: "b3xe5369j63fnzeh", answer: "Tight fit", value: "39"},
            {id: "b3xe5369j63fnzei", answer: "Regular fit", value: "40"},
            {id: "b3xe5369j63fnzej", answer: "Loose fit", value: ""}
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
      ]  
    };
    const expectedConclusion = {
      Size: {valid: false, questionError: 0, mappingErrors: [
        { id: "b3xe5369j63fnzej", errorCode: 1002 }
      ]},
      Color: {valid: true, questionError: 0, mappingErrors: []},
      Material: {valid: true, questionError: 0, mappingErrors: []} 
    };

    deepFreeze(selectedProduct);
    expect(parseProductAnswerMappings(selectedProduct))
      .toEqual(expectedConclusion);
  });

  it('detect answer mapping to multiple values', () => {
    const selectedProduct = {
      ...selectedProductValid,
      questions: [{
          answerMapping: [
            {id: "b3xe5369j63fnzeh", answer: "Loose fit", value: "39"},
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
      ]  
    };
    const expectedConclusion = {
      Size: {valid: false, questionError: 0, mappingErrors: [
        { id: "b3xe5369j63fnzej", errorCode: 1003, key: 'Loose fit' }
      ]},
      Color: {valid: true, questionError: 0, mappingErrors: []},
      Material: {valid: true, questionError: 0, mappingErrors: []} 
    };

    deepFreeze(selectedProduct);
    expect(parseProductAnswerMappings(selectedProduct))
      .toEqual(expectedConclusion);
  });

  it('detect invalid value', () => {
    const selectedProduct = {
      ...selectedProductValid,
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
            {id: "b3xe5369j63fnzen", answer: "No", value: "foo"}
          ],
          option: "Material",
          question: "Do you spend a lot of time outside?"
        }
      ]  
    };
    const expectedConclusion = {
      Size: {valid: true, questionError: 0, mappingErrors: []},
      Color: {valid: true, questionError: 0, mappingErrors: []},
      Material: {valid: false, questionError: 0, mappingErrors: [
        { id: "b3xe5369j63fnzen", errorCode: 1004 }
      ]}
    };

    deepFreeze(selectedProduct);
    expect(parseProductAnswerMappings(selectedProduct))
      .toEqual(expectedConclusion);
  });

  it('detect multiple errors', () => {
    const selectedProduct = {
      ...selectedProductValid,
      questions: [{
          answerMapping: [
            {id: "b3xe5369j63fnzeh", answer: "Loose fit", value: "39"},
            {id: "b3xe5369j63fnzei", answer: "Regular fit", value: ""},
            {id: "b3xe5369j63fnzej", answer: "Loose fit", value: "42"}
          ],
          option: "Size",
          question: "What fit do you prefer?"
        }, {
          answerMapping: [
            {id: "b3xe5369j63fnzek", answer: "", value: "yellow"},
            {id: "b3xe5369j63fnzel", answer: "I'd rather blend in", value: ""}
          ],
          option: "Color",
          question: ""
        }, {
          answerMapping: [
            {id: "b3xe5369j63fnzem", answer: "", value: ""},
            {id: "b3xe5369j63fnzen", answer: "No", value: "foo"}
          ],
          option: "Material",
          question: "Do you spend a lot of time outside?"
        }
      ]  
    };
    const expectedConclusion = {
      Size: {valid: false, questionError: 0, mappingErrors: [
        { id: "b3xe5369j63fnzei", errorCode: 1002 },
        { id: "b3xe5369j63fnzej", errorCode: 1003, key: 'Loose fit' }
      ]},
      Color: {valid: false, questionError: 1000, mappingErrors: [
        { id: "b3xe5369j63fnzek", errorCode: 1001 },
        { id: "b3xe5369j63fnzel", errorCode: 1002 }
      ]},
      Material: {valid: false, questionError: 0, mappingErrors: [
        { id: "b3xe5369j63fnzem", errorCode: 1001 },
        { id: "b3xe5369j63fnzen", errorCode: 1004 }
      ]}
    };

    deepFreeze(selectedProduct);
    expect(parseProductAnswerMappings(selectedProduct))
      .toEqual(expectedConclusion);
  });
});