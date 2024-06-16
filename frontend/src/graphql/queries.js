import { gql } from '@apollo/client';

export const GET_CATEGORIES = gql`
  query GetCategories {
    categories {
      id
      name
    }
  }
`;

export const GET_PRODUCTS = gql`
  query GetProducts {
    products {
      id
      name
      in_stock
      category_id
    }
  }
`;

export const GET_PRODUCT = gql`
    query GetProduct($id: String!) {
        product(id: $id) {
        id
        name
        in_stock
        description
        category_id
        }
    }
`;

export const GET_PRODUCT_ATTRIBUTES = gql`
    query GetProductAttributes {
        attributes {
        id
        product_id
        name
        type
        }
    }
`;

export const GET_PRODUCT_ATTRIBUTE_ITEMS = gql`
    query GetProductAttributeItems {
        attributeItems {
        id
        attribute_id
        display_value
        value
        }
    }
`;

export const GET_GALLERY_IMAGES = gql`
    query GetGalleryImages {
        galleries {
        id
        product_id
        image_url
        }
    }
    `;


export const GET_PRICES = gql`
    query GetPrices {
        prices {
        id
        product_id
        amount
        currency_id
        }
    }
    `;

export const GET_CURRENCY = gql`
    query GetCurrency {
        currencies {
        id
        label
        symbol
        }
    }
    `;