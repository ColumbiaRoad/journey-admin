import { connect } from 'react-redux';
import AnswerQuestions from '../components/AnswerQuestions';
//import { updateQuestion, proceedToAnswers } from '../actions/surveyBuilder';

const mapStateToProps = (state) => {
  return {
    questions: state.surveyBuilder.questions
  };
}

const mapDispatchToProps = (dispatch) => {
  return {
  }
}

const AnswerQuestionsContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(AnswerQuestions);

export default AnswerQuestionsContainer;
