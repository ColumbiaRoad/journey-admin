import React from 'react';
import { Page, Card, Banner, Button } from '@shopify/polaris';
import { ResourcePicker } from '@shopify/polaris/embedded';

import SelectedProdcutList from './SelectedProductList';

export default class AdminPanel extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
      selectedProducts: []
    }
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
        { this.state.selectedProducts.length > 0 && <SelectedProdcutList /> }
      </Page>
    );
  }
}
