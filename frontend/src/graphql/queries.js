import { gql } from '@apollo/client';

export const GET_PRODUCTS = gql`
  query GetProducts {
    products {
      id
      name
      shortDescription
      longDescription
      price
      imageUrl
      rating
    }
  }
`;

export const GET_PRODUCT = gql`
  query GetProduct($id: ID!) {
    product(id: $id) {
      id
      name
      shortDescription
      longDescription
      price
      imageUrl
      rating
    }
  }
`;

export const GET_CART = gql`
  query GetCart {
    cart {
      items {
        id
        productId
        quantity
        product {
          id
          name
          price
          imageUrl
        }
      }
      count
      total
    }
  }
`;

export const GET_CART_COUNT = gql`
  query GetCartCount {
    cartCount
  }
`;
