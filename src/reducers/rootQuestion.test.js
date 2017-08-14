import deepFreeze from 'deep-freeze';
import { updateRootQuestion, updateParsingReport } from '../actions/rootQuestion';
import rootQuestion from './rootQuestion';
import { parseAnswerMapping } from '../utils/answerMappingParser';

describe('rootQuestion', () => {
  it('update root question', () => {
    const beforeState = {
      question: '',
      answerMapping: [],
      parsingReport: {}
    };
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
      answerMapping: questionItem.answerMapping,
      parsingReport: {}
    };

    deepFreeze(beforeState);
    deepFreeze(action);
    expect(rootQuestion(
      beforeState, action
    )).toEqual(afterState);
  });

  it('update parsing report', () => {
    const beforeState = {
      question: 'How are you doing?',
      answerMapping: [
        {
          id: "b3xe5369j63fnzeh",
          answer: 'Amazing',
          value: 'Test Product'
        }
      ],
      parsingReport: {}
    };
    const parsingReport = parseAnswerMapping({
      question: beforeState.question,
      answerMapping: beforeState.answerMapping
    }, ['Test Product', 'Another Product']);
    const action = updateParsingReport(parsingReport);
    const afterState = {
      question: 'How are you doing?',
      answerMapping: [
        {
          id: "b3xe5369j63fnzeh",
          answer: 'Amazing',
          value: 'Test Product'
        }
      ],
      parsingReport: {
        valid: true,
        questionErrors: [],
        mappingErrors: []
      }
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