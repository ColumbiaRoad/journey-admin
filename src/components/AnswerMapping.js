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
      answer: answer,
      mapping: this.props.mapping.mapping
    }, this.props.id);
  }

  // Report change to parent component rather than dispatching event
  handleSelectChange(mapping) {
    this.props.onChange({
      answer: this.props.mapping.answer,
      mapping: mapping
    }, this.props.id);
  }

  render() {
    // Add value property if mapping exists
    const selectedValue = this.props.mapping.mapping.length > 0
      ? { value: this.props.mapping.mapping }
      : {};
    const header = this.props.id + 1 + '. Answer';
    return (
      <FormLayout.Group condensed title={header}>
        <TextField 
          onChange={this.handleTextFieldChange}
          value={this.props.mapping.answer}
          spellCheck
          placeholder={'Ice cream'}
        />
        <Select
          options={this.props.choices}
          onChange={this.handleSelectChange}
          placeholder='Mapping'
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