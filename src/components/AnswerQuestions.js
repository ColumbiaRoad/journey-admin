import React from 'react';
import { FormLayout, TextField, Button, Select, Heading } from '@shopify/polaris';

const AnswerRow = ({ answers, question, questionID, answerID,
    variants, saveAnswerAndVariant}) => {
  const readedAnswer = (!answers[question] || !answers[question][answerID]) ?
    '' : answers[question][answerID].answer;
  const readedVariant = (!answers[question] || !answers[question][answerID]) ?
    undefined : answers[question][answerID].variant;
  return (
    <FormLayout.Group
      key={questionID + '-' + answerID}
    >
      <TextField
        label={(answerID + 1) + "th answer to question \n" + question}
        onChange={(answerString) =>
          saveAnswerAndVariant(question, answerID, answerString, undefined)}
        value={readedAnswer}
      />
      <Select
        label="Corresponding variant"
        options={variants}
        onChange={(variantString) =>
          saveAnswerAndVariant(question, answerID, undefined, variantString)}
        placeholder="Select"
        value={readedVariant}
      />
    </ FormLayout.Group>
  );
};

export default class AnswerQuestions extends React.Component {
  render() {
    return (
      <FormLayout >
        <Heading>Map questions to variants</Heading>
        { this.props.questions.map((question, questionID) => {
          return this.props.answerIDs.map((answerID) => {
            return (
              <AnswerRow
                answers={this.props.answers}
                question={question}
                questionID={questionID}
                answerID={answerID}
                variants={this.props.variants}
                saveAnswerAndVariant={this.props.saveAnswerAndVariant}
                addNewAnswer={this.props.addNewAnswer}
                lastRow={(answerID + 1 === this.props.answerIDs.length)} />
            );
          });
        }) }
        <Button
          onClick={() => this.props.addNewAnswer()}
        > Add new answer</Button>
        <Button
          primary
          onClick={() => this.props.saveModel()}
        > Save answers and variants</Button>
      </FormLayout>
    );
  }
}
