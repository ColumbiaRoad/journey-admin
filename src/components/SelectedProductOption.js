import React from 'react';
import { Card, Button, FormLayout } from '@shopify/polaris';
import Question from './Question';
import AnswerMapping from './AnswerMapping';

export default class SelectedProductOption extends React.Component {

  constructor(props) {
    super(props);

    this.onAddAnswer = this.onAddAnswer.bind(this);
    this.onRemoveAnswer = this.onRemoveAnswer.bind(this);
    this.onUpdateAnswerMapping = this.onUpdateAnswerMapping.bind(this);
    this.onUpdateQuestion = this.onUpdateQuestion.bind(this);
  }

  onAddAnswer() {
    // Update complete item to keep redux store simple
    this.props.onSave({
      option: this.props.option.name,
      question: this.props.questionItem.question,
      answerMapping: [
        ...this.props.questionItem.answerMapping,
        {
          answer: '',
          value: ''
        }
      ],
      productId: this.props.productId
    });
  }

  onUpdateAnswerMapping(updatedMapping, index) {
    // Update changed mapping in global list
    const newAnswerMapping = this.props.questionItem.answerMapping.map((mapping, i) => {
        return index === i ? updatedMapping : mapping;
    });

    // Update complete item to keep redux store simple
    this.props.onSave({
      option: this.props.option.name,
      question: this.props.questionItem.question,
      answerMapping: newAnswerMapping,
      productId: this.props.productId
    });
  }

  onRemoveAnswer(index) {
    // Update global list
    const newAnswerMapping = this.props.questionItem.answerMapping.filter((mapping, i) => {
        return index !== i;
    });
    
    // Update complete item to keep redux store simple
    this.props.onSave({
      option: this.props.option.name,
      question: this.props.questionItem.question,
      answerMapping: newAnswerMapping,
      productId: this.props.productId
    });
  }

  onUpdateQuestion(question) {
    // Update complete item to keep redux store simple
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
            // Rather pass data as props than making redux store more complicated
            topic={this.props.option.name}
            onChange={this.onUpdateQuestion}
            question={this.props.questionItem.question} />
          {
            this.props.questionItem.answerMapping.map((mapping, index) => {
              // Rather pass data as props than making redux store more complicated
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
              onClick={this.onAddAnswer}>
              Add answer
            </Button>
          </FormLayout.Group>
      </Card.Section>
    );
  }
}
