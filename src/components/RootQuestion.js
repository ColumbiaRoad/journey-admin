import React from 'react';
import { Card, FormLayout, Button, Banner, List } from '@shopify/polaris';
import uniqid from 'uniqid';
import { uniq } from 'lodash'
import Question from './Question'
import AnswerMapping from './AnswerMapping';
import { PARSING_ERRORS } from '../utils/answerMappingParser';

class RootQuestion extends React.Component {

  constructor(props) {
    super(props);

    this.onUpdateQuestion = this.onUpdateQuestion.bind(this);
    this.onAddAnswer = this.onAddAnswer.bind(this);
    this.onUpdateAnswerMapping = this.onUpdateAnswerMapping.bind(this);
    this.onRemoveAnswerMapping = this.onRemoveAnswerMapping.bind(this);
  }

  onUpdateQuestion(question) {
    this.props.onUpdate({
      ...this.props.questionItem,
      question: question
    });
  }

  onAddAnswer() {
    const id = uniqid();
    this.props.onUpdate({
      ...this.props.questionItem,
      answerMapping: [
        ...this.props.questionItem.answerMapping,
        { id: id, answer: '', value: '' }
      ]
    });
  }

  onUpdateAnswerMapping(updatedMapping) {
    const newAnswerMapping = this.props.questionItem.answerMapping.map((mapping) => {
      return updatedMapping.id === mapping.id 
      ? { ...updatedMapping, value: parseInt(updatedMapping.value.split('/')[1].trim(), 10) } 
      : mapping;
    });

    this.props.onUpdate({
      ...this.props.questionItem,
      answerMapping: newAnswerMapping
    });
  }

  onRemoveAnswerMapping(removeId) {
    const newAnswerMapping = this.props.questionItem.answerMapping.filter((mapping) => {
      return removeId !== mapping.id;
    });

    this.props.onUpdate({
      ...this.props.questionItem,
      answerMapping: newAnswerMapping
    });
  }

  getErrorList() {
    // Check if parsingReport has any content
    if(this.props.questionItem.parsingReport.questionErrors) {
      return uniq([
        ...this.props.questionItem.parsingReport.questionErrors,
        ...this.props.questionItem.parsingReport.mappingErrors.map(e => e.errorCode)
      ]);
    } else {
      return [];
    }
  }

  render() {
    const parsingReport = this.props.questionItem.parsingReport;
    const errorList = this.getErrorList();
    const questionError = parsingReport.questionErrors &&
      parsingReport.questionErrors.length > 0;
    const mappingErrors = parsingReport.mappingErrors
      ? parsingReport.mappingErrors
      : [];
    return (
      <Card
        sectioned
        title='Root Question' >
        { errorList.length > 0 &&
          <Banner
            title="Root question could not be saved"
            status="critical"
          >
            <p>Please resolve the following issues:<br /><br /></p>
            <List type="bullet">
            { 
              errorList.map((e) => {
                return <List.Item key={e}>{PARSING_ERRORS[e]}</List.Item>
              })
            }
            </List>
          </Banner>
        }
        <Question
        topic='product'
        onChange={this.onUpdateQuestion}
        question={this.props.questionItem.question}
        error={questionError} />
        {
          this.props.questionItem.answerMapping.map((mapping, index) => {
            // Rather pass data as props than making redux store more complicated
            const errors = mappingErrors.filter(e => e.id === mapping.id).map(e => e.errorCode);
            return <AnswerMapping
                      mapping={{ ...mapping, value: typeof mapping.value === 'number'
                      ? `${this.props.products.find((p) => {
                        return p.id === mapping.value;
                      }).title} / ${mapping.value}`
                      : mapping.value}}
                      choices={this.props.products.map(p => `${p.title} / ${p.id}`)}
                      onRemove={this.onRemoveAnswerMapping}
                      onChange={this.onUpdateAnswerMapping}
                      id={mapping.id}
                      index={index}
                      key={mapping.id}
                      errors={errors} />
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