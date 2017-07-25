import { connect } from 'react-redux';
import SurveyQuestions from '../components/SurveyQuestions';
import { updateQuestion, proceedToAnswers } from '../actions/surveyBuilder'

const mapStateToProps = (state) => {
  return {
    questions: state.surveyBuilder.questions,
    product: state.surveyBuilder.product
  };
}

const mapDispatchToProps = (dispatch) => {
  return {
    updateQuestion: (id, value) => dispatch(updateQuestion(id, value)),
    proceedToAnswers: () => dispatch(proceedToAnswers()),
  }
}

const SurveyQuestionsContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(SurveyQuestions);

export default SurveyQuestionsContainer;
