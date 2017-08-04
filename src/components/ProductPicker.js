import React from 'react';
import { ResourcePicker } from '@shopify/polaris/embedded';

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

export default ProductPicker;