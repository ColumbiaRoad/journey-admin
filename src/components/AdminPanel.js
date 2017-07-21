import React from 'react';
import { Page, Card, Banner, Button } from '@shopify/polaris';
import { ResourcePicker } from '@shopify/polaris/embedded';

import SelectedProdcutListContainer from '../containers/SelectedProductListContainer';

export default class AdminPanel extends React.Component {
  render() {
    return (
      <Page>
        <Banner title="Yay it worked!">
          <p>The embedded polaris app has been successfully loaded</p>
        </Banner>

        <Card sectioned>
          <Button
            onClick={() => {
              this.props.onToggle();
            }}
          >
            Select Prodcuts
          </Button>
        </Card>
        <ResourcePicker
          products
          allowMultiple
          open={this.props.open}
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
            this.props.onSelect(selectedProducts);
          }}
          onCancel={() => this.props.onToggle()}
        />
        { this.props.selection > 0 && <SelectedProdcutListContainer /> }
      </Page>
    );
  }
}
