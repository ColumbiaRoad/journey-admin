import React from 'react';
import { Page, Layout, EmptyState } from '@shopify/polaris';

import SelectedProductListContainer from '../containers/SelectedProductListContainer'
import ProductPickerContainer from '../containers/ProductPickerContainer';
import RootQuestionContainer from '../containers/RootQuestionContainer';

const AdminPanel = (props) => {
  return (
    <Page>
      <Layout>
        <Layout.Section>
        { !props.selection &&
            <EmptyState
              heading="No products selected"
              action={{
                content: 'Select products',
                onAction: () => { props.onToggle('set') }
              }}
              image="https://cdn.shopify.com/s/files/1/0757/9955/files/empty-state.svg"
            >
              <p>Select products to create questions and map possible answers to product option values.</p>
            </EmptyState>
        }
        { (process.env.NODE_ENV !== 'development') &&
            <ProductPickerContainer /> }
        </Layout.Section>
        <Layout.Section>
          { props.selection &&
            <div>
              <RootQuestionContainer />
              <SelectedProductListContainer />
            </div> }
        </Layout.Section>
      </Layout>
    </Page>
  );
}

export default AdminPanel;
