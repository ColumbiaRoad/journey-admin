import React from 'react';
import { TextField, FormLayout } from '@shopify/polaris';

export default class Question extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      value: ''
    };

    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(val) {
    this.setState({
      value: val
    });
  }

  render() {
    return (
      <FormLayout.Group>
        <TextField
          label='Question'
          onChange={this.handleChange}
          value={this.state.value}
          spellCheck
          placeholder={`What's your favourite ${this.props.topic.toLowerCase()}?`}
        />
      </FormLayout.Group>
    );
  }
}