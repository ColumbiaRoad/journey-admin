import React from 'react';
import PropTypes from 'prop-types';
import { Card } from '@shopify/polaris';
import SelectedProductOptionContainer from '../containers/SelectedProductOptionContainer';

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
        primaryFooterAction={
          {
            content: 'Save',
            onAction: () => alert('hi')
          }
        }
        >
        {
          this.props.item.product.options.map((option) => {
            return (
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
