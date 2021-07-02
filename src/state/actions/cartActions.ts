import { ProductType } from '../../api/api';

export enum CART_ACTIONS_TYPE {
  ADD_TO_CART = 'ADD-TO-CART',
  REMOVE_FROM_CART = 'REMOVE-FROM-CART',
  UPDATE_CART_QUANTITY = 'UPDATE-CART-QUANTITY',
}

export type addToCartType = {
  type: CART_ACTIONS_TYPE.ADD_TO_CART;
  payload: {
    product: ProductType;
    productId: number;
    quantity: number;
  };
};

export const addToCartAC = (product: ProductType, productId: number): addToCartType => {
  return {
    type: CART_ACTIONS_TYPE.ADD_TO_CART,
    payload: {
      product,
      productId: productId,
      quantity: 1,
    },
  };
};

export type removeFromCartType = {
  type: CART_ACTIONS_TYPE.REMOVE_FROM_CART;
  payload: {
    productId: number;
    quantity: number;
  };
};

export const removeFromCartAC = (productId: number, quantity: number): removeFromCartType => {
  return {
    type: CART_ACTIONS_TYPE.REMOVE_FROM_CART,
    payload: {
      productId: productId,
      quantity: quantity,
    },
  };
};

export type updateCartQuantityType = {
  type: CART_ACTIONS_TYPE.UPDATE_CART_QUANTITY;
  payload: {
    productId: number;
    quantity: number;
  };
};

export const updateCartQuantityAC = (productId: number, quantity: number): updateCartQuantityType => {
  return {
    type: CART_ACTIONS_TYPE.UPDATE_CART_QUANTITY,
    payload: {
      productId,
      quantity: quantity,
    },
  };
};

export type CartActionsType = addToCartType | removeFromCartType | updateCartQuantityType;
