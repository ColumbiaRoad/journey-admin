import React from 'react';
import { TextField, FormLayout } from '@shopify/polaris';

const Question = (props) => {
  return (
    <FormLayout.Group>
      <TextField
        label={props.label}
        onChange={props.onChange}
        value={props.question}
        spellCheck
        placeholder={`What's your favourite ${props.topic.toLowerCase()}?`}
        error={props.error}
      />
    </FormLayout.Group>
  );
}

export default Question;