import React from 'react';
import { Card } from '@shopify/polaris';
import SelectedProductContainer from '../containers/SelectedProductContainer';

const SelectedProductList = (props) => {
    return (
      <Card
        sectioned
        subdued
        title={'Selected Products'}
        actions={[
          {
            content: 'Remove All',
            onAction: props.onDelete
          },
          {
            content: 'Add Product(s)',
            onAction: props.onAdd
          }
        ]} >
        { 
          props.products.map((item) => {
            // Rather pass item as prop than making redux store more complicated
            return <SelectedProductContainer
              item={item}
              key={item.product.id} />
          })
        }
      </Card>
    );
}

export default SelectedProductList;
