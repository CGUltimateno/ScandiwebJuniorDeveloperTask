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
        attributes{
        id
        product_id
        name
        type
        }
    }
`;

export const GET_PRODUCT_ATTRIBUTES_BY_PRODUCT_ID = gql`
    query GetProductAttributesByProductId($productId: String!) {
        attributesByProductId(productId: $productId) {
        id
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
        product_id
        display_value
        value
        }
    }
`;

export const GET_PRODUCT_ATTRIBUTE_ITEMS_BY_PRODUCT_ID = gql`
    query GetProductAttributeItemsByProductId($productId: String!) {
        attributeItemsByProductId(productId: $productId) {
        attribute_id
        product_id
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

export const GET_GALLERY_IMAGES_BY_PRODUCT_ID = gql`
    query GetGalleryImagesByProductId($productId: String!) {
    galleriesByProductId(productId: $productId) {
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

export const GET_PRICE_BY_PRODUCT_ID = gql`
    query GetPriceByProductId($productId: String!) {
        pricesByProductId(productId: $productId) {
        id
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


export const CREATE_ORDER = gql`
    mutation CreateOrder($total: Float!) {
        createOrderWithItems(total: $total) {
            id
            total
        }
    }
`;

export const CREATE_ORDER_ITEM = gql`
    mutation CreateOrderItem($order_id: Int!, $product_id: String!, $attribute_id: String, $attribute_item_id: String, $quantity: Int!) {
        createOrderItem(order_id: $order_id, product_id: $product_id, attribute_id: $attribute_id, attribute_item_id: $attribute_item_id, quantity: $quantity) {
            id
            order_id
            product_id
            attribute_id
            attribute_item_id
            quantity
        }
    }
`;