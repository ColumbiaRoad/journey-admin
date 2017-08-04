import React from 'react';
import { Page, Card, Button, Layout } from '@shopify/polaris';
import { ResourcePicker } from '@shopify/polaris/embedded';

import SelectedProductListContainer from '../containers/SelectedProductListContainer'

const ProductPicker = ({ open, onSelect, onToggle }) => {
  return (
    <ResourcePicker
      products
      allowMultiple
      open={open}
      onSelection={(resources) => {
        const selectedProducts = resources.products.map((p) => {
          return {
            id: p.id,
            title: p.title,
            options: p.options,
            variantCount: p.variants.length,
            tags: p.tags,
            variants: p.variants,
          };
        });
        onSelect(selectedProducts);
      }}
      onCancel={() => onToggle()}
    />
  );
}

export default class AdminPanel extends React.Component {
  render() {
    return (
      <Page>
        <Layout>
          <Layout.Section>
            <Card sectioned>
              <Button
                onClick={() => {
                  this.props.onToggle();
                }}
              >
                Select Products
              </Button>
            </Card>
          { (process.env.NODE_ENV !== 'development') &&
              <ProductPicker
                open={this.props.open}
                onSelect={this.props.onSelect}
                onToggle={this.props.onToggle} /> }
          </Layout.Section>
          <Layout.Section>
            <SelectedProductListContainer />
          </Layout.Section>
        </Layout>
      </Page>
    );
  }
}
