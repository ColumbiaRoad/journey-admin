
export const goToSurveyQuestion = (product) => {
  return {
    type: 'GO_TO_SURVEY_QUESTION',
    product,
  }
}

export const updateQuestion = (id, value) => {
  return {
    type: 'UPDATE_SURVEY_QUESTION',
    id, value
  }
}

export const proceedToAnswers = () => {
  return {
    type: 'PROCEED_TO_ANSWERS',
  }
}

export const saveAnswerAndVariant = (question, answerID, answer, variant) => {
  return {
    type: 'SAVE_ANSWER_AND_VARIANT',
    question, answerID, answer, variant
  }
}

export const addNewAnswer = () => {
  return {
    type: 'INCREMENT_ANSWER_COUNT',
  }
}

const saveSuccess = (json) => {
    return {
      type: 'SAVE_SUCCESS',
      json
    }
}

const saveFailed = (error) => {
    return {
      type: 'SAVE_FAILED',
      error
    }
}

export function createSaveModelRequest(token) {
  //body: JSON.stringify(requestData),
  return fetch(`https://ja-api-development.herokuapp.com/api/v1/products`,
    {
      method: 'get',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      }
    })
    .then((response) => {
      if (response.status === 200) {
        return response.json();
      }
      return response.json().then(body => {
        throw new Error(body.message);
      });
    });
}

export const saveModel = () => {
  return function (dispatch, getState) {
    if (false) {
      // VALIDATE request here
      return Promise.resolve();
    }
    const token = getState().jwtToken;
    return createSaveModelRequest(token).then((json) => {
      dispatch(saveSuccess(json));
    }).catch((err) => dispatch(saveFailed(err)));
  };
}
