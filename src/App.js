import React from 'react';
// import URLSearchParams from 'url-search-params';
import {Page, Card, Banner, Button, ResourceList } from '@shopify/polaris';
import { EmbeddedApp, ResourcePicker } from '@shopify/polaris/embedded';
import dotenv from 'dotenv';

dotenv.config();

const shop = new URLSearchParams(window.location.search).get('shop');
const shopOrigin = (shop) ? `https://${shop}` : undefined;
const apiKey = process.env.SHOPIFY_API_KEY;


export default class MyApp extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
      selectedProducts: []
    }
  }

  parseProduct(product) {
    return {
      url: `${shopOrigin}/admin/products/${product.id}`,
      attributeOne: product.title,
      attributeTwo: `Options: ${product.options.map((o) => o.name).join(', ')}`,
      attributeThree: `${product.variantCount} variants`
    }
  }

  renderSelectedProducts() {
    return (
      <Card>
        <ResourceList
          items={this.state.selectedProducts.map(this.parseProduct)}
          renderItem={(item, index) => {
            return <ResourceList.Item key={index} {...item} />;
          }}
        />
      </Card>
    );
  }

  render() {
    return (
      <EmbeddedApp
        apiKey={apiKey}
        shopOrigin={shopOrigin}
        forceRedirect
        debug
      > 
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
      </EmbeddedApp>
    );
  }
}
