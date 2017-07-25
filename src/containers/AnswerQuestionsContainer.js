import { connect } from 'react-redux';
import AnswerQuestions from '../components/AnswerQuestions';
import { saveAnswerAndVariant, saveModel, addNewAnswer } from '../actions/surveyBuilder';

const mapStateToProps = (state) => {
  return {
    questions: state.surveyBuilder.questions,
    product: state.surveyBuilder.product,
    variants: state.surveyBuilder.product.variants.map((v) => v.title),
    answers: state.surveyBuilder.answers,
    answerIDs: [...Array(state.surveyBuilder.answerCount).keys()], // creates sequence 1,2..n where n=answerCount-1
  };
}

const mapDispatchToProps = (dispatch) => {
  return {
    saveAnswerAndVariant: (question, answerID, answer, variant) =>
      dispatch(saveAnswerAndVariant(question, answerID, answer, variant)),
    saveModel: () => console.log('SAVE MODEL'),
    addNewAnswer: () => dispatch(addNewAnswer()),
  }
}

const AnswerQuestionsContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(AnswerQuestions);

export default AnswerQuestionsContainer;
