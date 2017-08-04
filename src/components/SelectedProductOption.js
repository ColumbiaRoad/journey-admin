import React from 'react';
import { Card, Button, FormLayout } from '@shopify/polaris';
import Question from './Question';
import AnswerMapping from './AnswerMapping';

export default class SelectedProductOption extends React.Component {

  constructor(props) {
    super(props);

    this.handleAddAnswer = this.handleAddAnswer.bind(this);
    this.onRemoveAnswer = this.onRemoveAnswer.bind(this);
    this.onUpdateAnswerMapping = this.onUpdateAnswerMapping.bind(this);
    this.onUpdateQuestion = this.onUpdateQuestion.bind(this);
  }

  handleAddAnswer() {
    this.props.onSave({
      option: this.props.option.name,
      question: this.props.questionItem.question,
      answerMapping: [
        ...this.props.questionItem.answerMapping,
        {
          answer: '',
          mapping: ''
        }
      ],
      productId: this.props.productId
    });
  }

  onUpdateAnswerMapping(updatedMapping, index) {
    const newAnswerMapping = this.props.questionItem.answerMapping.map((mapping, i) => {
        return index === i ? updatedMapping : mapping;
    });

    this.props.onSave({
      option: this.props.option.name,
      question: this.props.questionItem.question,
      answerMapping: newAnswerMapping,
      productId: this.props.productId
    });
  }

  onRemoveAnswer(index) {
    const newAnswerMapping = this.props.questionItem.answerMapping.filter((mapping, i) => {
        return index !== i;
    });

    this.props.onSave({
      option: this.props.option.name,
      question: this.props.questionItem.question,
      answerMapping: newAnswerMapping,
      productId: this.props.productId
    });
  }

  onUpdateQuestion(question) {
    this.props.onSave({
      option: this.props.option.name,
      question: question,
      answerMapping: this.props.questionItem.answerMapping,
      productId: this.props.productId
    });
  }

  render() {
    return (
      <Card.Section
        title={this.props.option.name}
        key={this.props.option.position}>
          <Question
            topic={this.props.option.name}
            onChange={this.onUpdateQuestion}
            question={this.props.questionItem.question} />
          {
            this.props.questionItem.answerMapping.map((mapping, index) => {
              return <AnswerMapping
                        mapping={mapping}
                        choices={this.props.option.values}
                        onRemove={this.onRemoveAnswer}
                        onChange={this.onUpdateAnswerMapping}
                        id={index}
                        key={index} />
            })
          }
          <FormLayout.Group>
            <Button
              onClick={this.handleAddAnswer}>
              Add answer
            </Button>
          </FormLayout.Group>
      </Card.Section>
    );
  }
}
