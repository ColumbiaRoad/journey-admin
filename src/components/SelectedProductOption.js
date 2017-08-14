import React from 'react';
import { Card, Button, FormLayout } from '@shopify/polaris';
import uniqid from 'uniqid';
import Question from './Question';
import AnswerMapping from './AnswerMapping';

export default class SelectedProductOption extends React.Component {

  constructor(props) {
    super(props);

    this.onAddAnswer = this.onAddAnswer.bind(this);
    this.onRemoveAnswerMapping = this.onRemoveAnswerMapping.bind(this);
    this.onUpdateAnswerMapping = this.onUpdateAnswerMapping.bind(this);
    this.onUpdateQuestion = this.onUpdateQuestion.bind(this);
  }

  onAddAnswer() {
    const id = uniqid();
    // Update complete item to keep redux store simple
    this.props.onSave({
      option: this.props.option.name,
      question: this.props.questionItem.question,
      answerMapping: [
        ...this.props.questionItem.answerMapping,
        {
          id: id,
          answer: '',
          value: ''
        }
      ],
      productId: this.props.productId
    });
  }

  onUpdateAnswerMapping(updatedMapping) {
    // Update changed mapping in global list
    const newAnswerMapping = this.props.questionItem.answerMapping.map((mapping) => {
        return updatedMapping.id === mapping.id ? updatedMapping : mapping;
    });

    // Update complete item to keep redux store simple
    this.props.onSave({
      option: this.props.option.name,
      question: this.props.questionItem.question,
      answerMapping: newAnswerMapping,
      productId: this.props.productId
    });
  }

  onRemoveAnswerMapping(removeId) {
    // Update global list
    const newAnswerMapping = this.props.questionItem.answerMapping.filter((mapping) => {
        return removeId !== mapping.id;
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
    const questionError = this.props.errors && this.props.errors.questionErrors.length > 0;
    const mappingErrors = this.props.errors 
      ? this.props.errors.mappingErrors
      : [];
    return (
      <Card.Section
        title={this.props.option.name}
        key={this.props.option.position}>
          <Question
            // Rather pass data as props than making redux store more complicated
            topic={this.props.option.name}
            onChange={this.onUpdateQuestion}
            question={this.props.questionItem.question}
            error={questionError} />
          {
            this.props.questionItem.answerMapping.map((mapping, index) => {
              // Rather pass data as props than making redux store more complicated
              const errors = mappingErrors.filter(e => e.id === mapping.id).map(e => e.errorCode);
              return <AnswerMapping
                        mapping={mapping}
                        choices={this.props.option.values}
                        onRemove={this.onRemoveAnswerMapping}
                        onChange={this.onUpdateAnswerMapping}
                        id={mapping.id}
                        index={index}
                        errors={errors}
                        key={mapping.id} />
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
