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
  query GetProducts($categoryId: ID!) {
    category(id: $categoryId) {
      products {
        id
        name
        price
        in_stock
        gallery
      }
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

