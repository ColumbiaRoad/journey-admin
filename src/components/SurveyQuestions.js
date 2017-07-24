import React from 'react';
import { FormLayout, TextField, Button } from '@shopify/polaris';

export default class SurveyQuestions extends React.Component {
  render() {
    const nbQuestions = 1;
    const questionIDs = [...Array(nbQuestions).keys()];
    return (
      <FormLayout >
        { questionIDs.map((id) => {
          return(
            <FormLayout.Group key={id} >
              <TextField
                label="Question"
                onChange={(value) => this.props.updateQuestion(id, value)}
                value={this.props.questions[id]}
              />
            </ FormLayout.Group>
          );
        }) }
        <Button
          primary
          onClick={() => this.props.proceedToAnswers()}
        > Save questions</Button>
      </FormLayout>
    );
  }
}
