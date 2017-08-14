import React from 'react';
import { Card, FormLayout, Button } from '@shopify/polaris';
import uniqid from 'uniqid';
import Question from './Question'
import AnswerMapping from './AnswerMapping';

class RootQuestion extends React.Component {

  constructor(props) {
    super(props);

    this.onUpdateQuestion = this.onUpdateQuestion.bind(this);
    this.onAddAnswer = this.onAddAnswer.bind(this);
    this.onUpdateAnswerMapping = this.onUpdateAnswerMapping.bind(this);
    this.onRemoveAnswerMapping = this.onRemoveAnswerMapping.bind(this);
  }

  onUpdateQuestion(question) {
    this.props.onSave({
      ...this.props.questionItem,
      question: question
    });
  }

  onAddAnswer() {
    const id = uniqid();
    this.props.onSave({
      ...this.props.questionItem,
      answerMapping: [
        ...this.props.questionItem.answerMapping,
        { id: id, answer: '', value: '' }
      ]
    });
  }

  onUpdateAnswerMapping(updatedMapping) {
    const newAnswerMapping = this.props.questionItem.answerMapping.map((mapping) => {
      return updatedMapping.id === mapping.id ? updatedMapping : mapping;
    });

    this.props.onSave({
      ...this.props.questionItem,
      answerMapping: newAnswerMapping
    });
  }

  onRemoveAnswerMapping(removeId) {
    const newAnswerMapping = this.props.questionItem.answerMapping.filter((mapping) => {
      return removeId !== mapping.id;
    });

    this.props.onSave({
      ...this.props.questionItem,
      answerMapping: newAnswerMapping
    });
  }

  render() {
    return (
      <Card
        sectioned
        title='Root Question'
        secondaryFooterAction={{
          content: 'Save'
        }} >
        <Question
        topic='product'
        onChange={this.onUpdateQuestion}
        question={this.props.questionItem.question} />
        {
          this.props.questionItem.answerMapping.map((mapping, index) => {
            // Rather pass data as props than making redux store more complicated
            return <AnswerMapping
                      mapping={mapping}
                      choices={this.props.products.map(p => p.title)}
                      onRemove={this.onRemoveAnswerMapping}
                      onChange={this.onUpdateAnswerMapping}
                      id={mapping.id}
                      index={index}
                      key={mapping.id} />
          })
        }
        <FormLayout.Group>
          <Button onClick={this.onAddAnswer}>
            Add answer
          </Button>
        </FormLayout.Group>
      </Card>
    );
  }
}

export default RootQuestion;