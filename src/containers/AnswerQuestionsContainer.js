import { connect } from 'react-redux';
import AnswerQuestions from '../components/AnswerQuestions';
import { saveAnswerAndVariant, saveModel } from '../actions/surveyBuilder';

const mapStateToProps = (state) => {
  return {
    questions: state.surveyBuilder.questions,
    product: state.surveyBuilder.product,
    variants: state.surveyBuilder.product.variants.map((v) => v.title),
    answers: state.surveyBuilder.answers,
  };
}

const mapDispatchToProps = (dispatch) => {
  return {
    saveAnswerAndVariant: (question, answerID, answer, variant) =>
      dispatch(saveAnswerAndVariant(question, answerID, answer, variant)),
    saveModel: () => console.log('SAVE MODEL')
  }
}

const AnswerQuestionsContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(AnswerQuestions);

export default AnswerQuestionsContainer;
