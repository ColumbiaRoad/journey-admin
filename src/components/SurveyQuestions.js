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
                label="question"
                placeholder="What question would you like to ask your client, to choose the variants?"
              />
              <TextField
                label="How many answers there are for given question?"
                type="number"
              />
            </ FormLayout.Group>
          );
        }) }
        <Button primary
          onClick={(form) => {
            console.log(form);
          }}
        > Save questions</Button>
      </FormLayout>
    );
  }
}
