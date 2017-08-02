import React from 'react';
import { Card, Button, FormLayout } from '@shopify/polaris';
import Question from './Question';
import AnswerMapping from './AnswerMapping';

export default class SelectedProductOption extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      question: '',
      answerMapping: []
    };

    this.handleAddAnswer = this.handleAddAnswer.bind(this);
    this.onNewQuestion = this.onNewQuestion.bind(this);
    this.onRemoveAnswer = this.onRemoveAnswer.bind(this);
    this.onUpdateAnswerMapping = this.onUpdateAnswerMapping.bind(this);
  }

  handleAddAnswer() {
    this.setState({
      answerMapping: [
        ...this.state.answerMapping,
        {
          answer: '',
          mapping: ''
        }
      ]
    });
  }

  onUpdateAnswerMapping(updatedMapping, index) {
    const newAnswerMapping = this.state.answerMapping.map((mapping, i) => {
        return index === i ? updatedMapping : mapping;
    });
    this.setState({
      answerMapping: newAnswerMapping
    })
    this.props.onSave({
      option: this.props.option.name,
      question: this.state.question,
      answerMapping: newAnswerMapping,
      productId: this.props.productId
    });
  }

  onRemoveAnswer(index) {
    const newAnswerMapping = this.state.answerMapping.filter((mapping, i) => {
        return index !== i;
    });
    this.setState({
      answerMapping: newAnswerMapping
    });

    this.props.onSave({
      option: this.props.option.name,
      question: this.state.question,
      answerMapping: newAnswerMapping,
      productId: this.props.productId
    });
  }

  onNewQuestion(question) {
    this.setState({
      question: question
    });
    console.log(question);
  }

  render() {
    return (
      <Card.Section
        title={this.props.option.name}
        key={this.props.option.position}>
          <Question
            topic={this.props.option.name}
            onSubmit={this.onNewQuestion} />
          {
            this.state.answerMapping.map((mapping, index) => {
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
