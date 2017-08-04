import React from 'react';
import { Page, Card, Button, Layout } from '@shopify/polaris';

import SelectedProductListContainer from '../containers/SelectedProductListContainer'
import ProductPicker from './ProductPicker';

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
