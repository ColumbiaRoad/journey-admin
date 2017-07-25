import React from 'react';
import { FormLayout, TextField, Button, Select } from '@shopify/polaris';

export default class AnswerQuestions extends React.Component {
  render() {
    return (
      <FormLayout >
        { this.props.questions.map((question, i) => {
          const labelText = `Map question '${question}' to variant`;
          const answerID = 0;
          const readedAnswer = (!this.props.answers[question]) ?
            '' : this.props.answers[question][answerID].answer;
          const readedVariant = (!this.props.answers[question]) ?
            undefined : this.props.answers[question][answerID].variant;
          return (
            <FormLayout.Group
              key={i}
              label={labelText}
            >
              <TextField
                label={"Answer to question \n" + question}
                onChange={(answerString) =>
                  this.props.saveAnswerAndVariant(question, answerID, answerString, undefined)}
                value={readedAnswer}
              />
              <Select
                label="Variant"
                options={this.props.variants}
                onChange={(variantString) =>
                  this.props.saveAnswerAndVariant(question, answerID, undefined, variantString)}
                placeholder="Select"
                value={readedVariant}
              />
            </ FormLayout.Group>
          );
        }) }
        <Button
          primary
          onClick={() => this.props.saveModel()}
        > Save answers and variants</Button>
      </FormLayout>
    );
  }
}
//saveAnswerAndVariant
