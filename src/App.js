import React from 'react';
import * as PropTypes from 'prop-types';
import { Page, Card, Banner, Button, ResourceList } from '@shopify/polaris';
import { ResourcePicker } from '@shopify/polaris/embedded';

export default class MyApp extends React.Component {

  static contextTypes = {
    easdk: PropTypes.object,
  };

  constructor(props) {
    super(props);
    this.state = {
      open: false,
      selectedProducts: []
    }
  }

  parseProduct(product) {
    return {
      url: '#',
      attributeOne: product.title,
      attributeTwo: `Options: ${product.options.map((o) => o.name).join(', ')}`,
      attributeThree: `${product.variantCount} variant(s)`,
      actions: [{content: 'View Product', onClick: () => this.context.easdk.redirect(`/products/${product.id}`)}]
    }
  }

  renderSelectedProducts() {
    return (
      <Card title='Selected Products'>
        <ResourceList
          items={this.state.selectedProducts}
          renderItem={(item, index) => {
            const parsed = this.parseProduct(item);
            return <ResourceList.Item key={index} {...parsed} />;
          }}
        />
      </Card>
    );
  }

  render() {
    return (
      <Page>
        <Banner title="Yay it worked!">
          <p>The embedded polaris app has been successfully loaded</p>
        </Banner>

        <Card sectioned>
          <Button
            onClick={() => {
              this.setState({
                open:true
              });
            }}
          >
            Select Prodcuts
          </Button>
        </Card>
        <ResourcePicker
          products
          allowMultiple
          open={this.state.open}
          onSelection={(resources) => {
            const selectedProducts = resources.products.map((p) => {
              return {
                id: p.id,
                title: p.title,
                options: p.options,
                variantCount: p.variants.length,
                tags: p.tags
              };
            });
            console.log('Selected products: ', selectedProducts);
            this.setState({
              open: false,
              selectedProducts: selectedProducts
            });
          }}
          onCancel={() => this.setState({open: false})}
        />
        { this.state.selectedProducts.length > 0 && this.renderSelectedProducts() }
      </Page>
    );
  }
}
