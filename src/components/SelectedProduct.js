import React from 'react';
import PropTypes from 'prop-types';
import { Card } from '@shopify/polaris';
import SelectedProductOptionContainer from '../containers/SelectedProductOptionContainer';
import { parseProductAnswerMappings } from '../utils/answerMappingParser';

export default class SelectedProductList extends React.Component {
  static contextTypes = {
    easdk: PropTypes.object,
  };

  constructor(props) {
    super(props);

    this.state = {
      parsingState: {}
    };
    this.onSave = this.onSave.bind(this);
  }

  onSave() {
    const parsingState = parseProductAnswerMappings(this.props.item);
    this.setState({
      parsingState: parsingState
    });
  }

  render() {
    return (
      <Card
        title={this.props.item.product.title}
        key={this.props.item.product.id}
        sectioned
        actions={[
          {
            content: 'Remove',
            onAction: () => this.props.onDelete(this.props.item.product.id)
          },
          {
            content: 'View',
            onAction: () => this.context.easdk.redirect(`/products/${this.props.item.product.id}`)
          }
        ]}
        secondaryFooterAction={{
            content: 'Save',
            onAction: this.onSave
        }} >
        {
          this.props.item.product.options.map((option) => {
            const errors = this.state.parsingState[option.name] && !this.state.parsingState[option.name].valid
              ? this.state.parsingState[option.name]
              : false;
            return (
              // Rather pass data as props than making redux store more complicated
              <SelectedProductOptionContainer
                option={option}
                productId={this.props.item.product.id}
                key={option.position}
                errors={errors} />
            );
          })
        }
      </Card>
    );
  }
}
