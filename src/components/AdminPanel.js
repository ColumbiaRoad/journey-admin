import React from 'react';
import { Page, Layout, Banner } from '@shopify/polaris';

import SelectedProductListContainer from '../containers/SelectedProductListContainer'
import ProductPickerContainer from '../containers/ProductPickerContainer';

const AdminPanel = (props) => {
  return (
    <Page>
      <Layout>
        <Layout.Section>
        { !props.selection &&
            <Banner
              title="No products selected"
              action={{
                content: 'Select products',
                onAction: () => { props.onToggle('set') }
              }}
            >
              <p>Select products to create questions and map possible answers to product option values.</p>
            </Banner> }
        { (process.env.NODE_ENV !== 'development') &&
            <ProductPickerContainer /> }
        </Layout.Section>
        <Layout.Section>
          { props.selection &&
              <SelectedProductListContainer /> }
        </Layout.Section>
      </Layout>
    </Page>
  );
}

export default AdminPanel;
