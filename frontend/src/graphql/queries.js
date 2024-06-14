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