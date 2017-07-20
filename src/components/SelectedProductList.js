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
      actions: [{content: 'View Product', onClick: () => this.context.easdk.redirect(`/products/${product.id}`)}]
    }
  }

  render() {
    return (
      <Card title='Selected Products'>
        <ResourceList
          items={this.props.prodcuts}
          renderItem={(item, index) => {
            const parsed = this.parseProduct(item);
            return <ResourceList.Item key={index} {...parsed} />;
          }}
        />
      </Card>
    );
  }
}