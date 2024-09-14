import type { Schema, Attribute } from '@strapi/strapi';

export interface VariantsCakeVariants extends Schema.Component {
  collectionName: 'components_variants_cake_variants';
  info: {
    displayName: 'CakeVariants';
    icon: 'bulletList';
    description: '';
  };
  attributes: {
    VariantName: Attribute.String &
      Attribute.SetMinMaxLength<{
        minLength: 1;
        maxLength: 50;
      }>;
    product: Attribute.Relation<
      'variants.cake-variants',
      'oneToOne',
      'api::product.product'
    >;
  };
}

declare module '@strapi/types' {
  export module Shared {
    export interface Components {
      'variants.cake-variants': VariantsCakeVariants;
    }
  }
}
