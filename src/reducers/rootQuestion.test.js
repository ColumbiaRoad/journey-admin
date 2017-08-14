import deepFreeze from 'deep-freeze';
import { updateRootQuestion } from '../actions/rootQuestion';
import rootQuestion from './rootQuestion';

describe('rootQuestion', () => {
  it('update root question', () => {
    const beforeState = {};
    const questionItem = {
      question: 'How are you doing?',
      answerMapping: [
        {
          answer: 'Amazing',
          value: 'Test Product'
        }
      ]
    };
    const action = updateRootQuestion(questionItem);
    const afterState = {
      question: questionItem.question,
      answerMapping: questionItem.answerMapping
    };

    deepFreeze(beforeState);
    deepFreeze(action);
    expect(rootQuestion(
      beforeState, action
    )).toEqual(afterState);
  });

  it('handle unkown action', () => {
    const beforeState = {};
    const action = {
      foo: 'bar'
    };
    
    deepFreeze(beforeState);
    deepFreeze(action);
    expect(rootQuestion(
      beforeState, action
    )).toEqual(beforeState);
  })
});