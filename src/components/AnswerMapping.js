import React from 'react';
import { Select, TextField, FormLayout, Button } from '@shopify/polaris';

export default class AnswerMapping extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      answer: '',
      mapping: ''
    };

    this.handleTextFieldChange = this.handleTextFieldChange.bind(this);
    this.handleSelectChange = this.handleSelectChange.bind(this);
  }

  handleTextFieldChange(answer) {
    this.setState({
      answer
    });
    this.props.onChange({
      ...this.state,
      answer
    }, this.props.id);
  }

  handleSelectChange(mapping) {
    this.setState({
      mapping
    });
    this.props.onChange({
      ...this.state,
      mapping
    }, this.props.id);
  }

  render() {
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