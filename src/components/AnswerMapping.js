import React from 'react';
import { Select, TextField, FormLayout, Button } from '@shopify/polaris';

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
    return (
      <FormLayout.Group condensed title={header}>
        <TextField 
          onChange={this.handleTextFieldChange}
          value={this.props.mapping.answer}
          spellCheck
          placeholder={'Ice cream'}
          error={this.props.error}
        />
        <Select
          options={this.props.choices}
          onChange={this.handleSelectChange}
          placeholder='Mapping'
          error={this.props.error}
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