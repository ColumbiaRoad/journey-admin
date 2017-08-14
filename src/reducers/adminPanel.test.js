import deepFreeze from 'deep-freeze';
import adminPanel from './adminPanel';

describe('adminPanel', () => {
  it('handle undefined action', () => {
    const beforeState = {};
    const action = {
      foo: 'bar'
    };
    const afterState = {
      productPicker: {
        open: false,
        onSelectAction: 'set'
      },
      jwtToken: '',
      selectedProducts: [],
      rootQuestion: {
        question: '',
        answerMapping: [],
        parsingReport: {}
      }
    }

    deepFreeze(beforeState);
    deepFreeze(action);
    expect(adminPanel(
      beforeState, action
    )).toEqual(afterState);
  });
});