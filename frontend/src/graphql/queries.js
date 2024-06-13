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
  query GetProduct($id: ID!) {
    product(id: $id) {
        id
        name
        prices {
          currency
          amount
        }
        inStock
        gallery
        description
        attributes {
          id
          name
          type
          items {
            displayValue
            value
          }
        }
      }
  }
`;

