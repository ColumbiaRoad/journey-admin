import React from 'react';
import PropTypes from 'prop-types';
import { Card, ResourceList } from '@shopify/polaris';

export default class SelectedProductList extends React.Component {
  static contextTypes = {
    easdk: PropTypes.object,
  };

  parseProduct(product) {
    return {
      url: '#',
      attributeOne: product.title,
      attributeTwo: `Options: ${product.options.map((o) => o.name).join(', ')}`,
      attributeThree: `${product.variantCount} variant(s)`,
      actions: [
        {
          content: 'Go to page',
          onClick: () => {
            this.context.easdk.redirect('/apps/journey-assistant/page');
            withRouter(({ history }) => {
              history.push('/page');
            });
          }
        },
        {
          content: 'View',
          onClick: () => this.context.easdk.redirect(`/products/${product.id}`)
        },{
          content: 'Delete',
          onClick: () => this.props.onDelete(product.id)
        }]
    }
  }

  render() {
    return (
      <Card title='Selected Products'>
        <ResourceList
          items={this.props.products}
          renderItem={(item, index) => {
            const parsed = this.parseProduct(item);
            return <ResourceList.Item key={index} {...parsed} />;
          }}
        />
      </Card>
    );
  }
}
