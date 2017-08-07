import React from 'react';
import PropTypes from 'prop-types';
import { Card } from '@shopify/polaris';
import SelectedProductOptionContainer from '../containers/SelectedProductOptionContainer';
import { parseProductAnswerMappings } from '../utils/answerMappingParser';

export default class SelectedProductList extends React.Component {
  static contextTypes = {
    easdk: PropTypes.object,
  };

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
            onAction: () => alert(JSON.stringify(parseProductAnswerMappings(this.props.item)))
        }} >
        {
          this.props.item.product.options.map((option) => {
            return (
              // Rather pass data as props than making redux store more complicated
              <SelectedProductOptionContainer
                option={option}
                productId={this.props.item.product.id}
                key={option.position} />
            )
          })
        }
      </Card>
    );
  }
}
