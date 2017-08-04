import React from 'react';
import { Card } from '@shopify/polaris';
import SelectedProductContainer from '../containers/SelectedProductContainer';

const SelectedProductList = (props) => {
    return (
      <Card
        sectioned
        title={'Selected Products'}>
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
