import React from 'react';
import PropTypes from 'prop-types';
import { Card } from '@shopify/polaris';
import SelectedProductContainer from '../containers/SelectedProductContainer';

export default class SelectedProductList extends React.Component {
  static contextTypes = {
    easdk: PropTypes.object,
  };

  render() {
    return (
      <Card
        sectioned
        title={'Selected Products'}>
        { 
          this.props.products.map((item) => {
            return <SelectedProductContainer
              item={item}
              key={item.product.id} />
          })
        }
      </Card>
    );
  }
}
