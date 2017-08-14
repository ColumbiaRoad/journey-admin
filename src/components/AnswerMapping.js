import React from 'react';
import { Select, TextField, FormLayout, Button } from '@shopify/polaris';
import { intersection } from 'lodash'

export default class AnswerMapping extends React.Component {
  constructor(props) {
    super(props);

    this.handleTextFieldChange = this.handleTextFieldChange.bind(this);
    this.handleSelectChange = this.handleSelectChange.bind(this);
  }

  // Report change to parent component rather than dispatching event
  handleTextFieldChange(answer) {
    this.props.onChange({
      id: this.props.id,
      answer: answer,
      value: this.props.mapping.value
    });
  }

  // Report change to parent component rather than dispatching event
  handleSelectChange(value) {
    this.props.onChange({
      id: this.props.id,
      answer: this.props.mapping.answer,
      value: value
    });
  }

  render() {
    // Add value property if mapping exists
    const selectedValue = this.props.mapping.value.length > 0
      ? { value: this.props.mapping.value }
      : {};
    const header = this.props.index + 1 + '. Answer';
    // Check for errors. Codes can be found in /utils/answerMappingParser
    const answerError = intersection(this.props.errors, [1000, 1002]).length > 0;
    const valueError = intersection(this.props.errors, [1001, 1003]).length > 0;
    return (
      <FormLayout.Group condensed title={header}>
        <TextField 
          onChange={this.handleTextFieldChange}
          value={this.props.mapping.answer}
          spellCheck
          placeholder={'Ice cream'}
          error={answerError}
        />
        <Select
          options={this.props.choices}
          onChange={this.handleSelectChange}
          placeholder='Mapping'
          error={valueError}
          {...selectedValue}
        />
        <Button
          destructive
          onClick={() => this.props.onRemove(this.props.id)} >
          Remove
        </Button>
      </FormLayout.Group>
    );
  }
}