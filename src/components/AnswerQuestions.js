import React from 'react';
import { FormLayout, TextField, Button } from '@shopify/polaris';

export default class AnswerQuestions extends React.Component {
  render() {
    return (
      <FormLayout >
        { this.props.questions.map((question) => {
          const labelText = `Map question '${question}' to variant`;
          return(
            <FormLayout.Group key={question} >
              <TextField
                label={labelText}
              />
            </ FormLayout.Group>
          );
        }) }
      </FormLayout>
    );
  }
}
