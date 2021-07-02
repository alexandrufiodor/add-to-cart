import { productsAPI, ProductType } from '../../api/api';
import { Dispatch } from 'redux';

export enum PRODUCT_ACTIONS_TYPE {
  FETCH_PRODUCTS_BEGIN = 'FETCH-PRODUCTS-BEGIN',
  FETCH_PRODUCTS_SUCCESS = 'FETCH-PRODUCTS-SUCCESS',
  FETCH_PRODUCTS_FAILURE = 'FETCH-PRODUCTS-FAILURE',
  SORT_BY_CATEGORY = 'ORDER-BY-CATEGORY-ASC',
  SORT_BY_PRICE = 'SORT-BY-PRICE',
}

export type fetchProductsBeginType = {
  type: PRODUCT_ACTIONS_TYPE.FETCH_PRODUCTS_BEGIN;
};

export const fetchProductsBeginAC = (): fetchProductsBeginType => {
  return { type: PRODUCT_ACTIONS_TYPE.FETCH_PRODUCTS_BEGIN };
};

export type fetchProductsSuccessType = {
  type: PRODUCT_ACTIONS_TYPE.FETCH_PRODUCTS_SUCCESS;
  payload: { products: Array<ProductType> };
};

export const fetchProductsSuccessAC = (products: Array<ProductType>): fetchProductsSuccessType => {
  return {
    type: PRODUCT_ACTIONS_TYPE.FETCH_PRODUCTS_SUCCESS,
    payload: { products: products },
  };
};

export type fetchProductsFailureType = {
  type: PRODUCT_ACTIONS_TYPE.FETCH_PRODUCTS_FAILURE;
  payload: { error: string };
};

export const fetchProductsFailureAC = (error: string): fetchProductsFailureType => {
  return {
    type: PRODUCT_ACTIONS_TYPE.FETCH_PRODUCTS_FAILURE,
    payload: { error },
  };
};

export type sortByCategoryType = {
  type: PRODUCT_ACTIONS_TYPE.SORT_BY_CATEGORY;
  payload: { products: Array<ProductType>; sortKey: string };
};

export const sortByCategoryAC = (products: Array<ProductType>, sortKey: string): sortByCategoryType => {
  return {
    type: PRODUCT_ACTIONS_TYPE.SORT_BY_CATEGORY,
    payload: { products: products, sortKey: sortKey },
  };
};

export type sortByPriceType = {
  type: PRODUCT_ACTIONS_TYPE.SORT_BY_PRICE;
  payload: { products: Array<ProductType>; sortKey: string };
};

export const sortByPriceAC = (products: Array<ProductType>, sortKey: string): sortByPriceType => {
  return {
    type: PRODUCT_ACTIONS_TYPE.SORT_BY_PRICE,
    payload: { products: products, sortKey: sortKey },
  };
};

export function fetchProducts() {
  return (dispatch: ThunkDispatch) => {
    dispatch(fetchProductsBeginAC());
    return productsAPI
      .geProducts()
      .then(handleErrors)
      .then((res) => res.json())
      .then((json) => {
        dispatch(fetchProductsSuccessAC(json));
        return json;
      })
      .catch((error) => dispatch(fetchProductsFailureAC(error)));
  };
}

function handleErrors(response: any) {
  if (!response.ok) {
    throw Error(response.statusText);
  }
  return response;
}

export type FetchActionsType =
  | fetchProductsBeginType
  | fetchProductsSuccessType
  | fetchProductsFailureType
  | sortByCategoryType
  | sortByPriceType;

type ThunkDispatch = Dispatch<FetchActionsType>;
