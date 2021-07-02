import { ProductType } from '../../api/api';
import { PRODUCT_ACTIONS_TYPE, FetchActionsType } from '../actions/productActions';

const initialState: FetchProductsStateType = {
  items: [],
  loading: false,
  error: '',
};

export type FetchProductsStateType = {
  items: Array<ProductType>;
  loading: boolean;
  error: string;
};

export const ProductReducer = (
  state: FetchProductsStateType = initialState,
  action: FetchActionsType,
): FetchProductsStateType => {
  switch (action.type) {
    case PRODUCT_ACTIONS_TYPE.FETCH_PRODUCTS_BEGIN:
      return {
        ...state,
        loading: true,
        error: '',
      };

    case PRODUCT_ACTIONS_TYPE.FETCH_PRODUCTS_SUCCESS:
      return {
        ...state,
        loading: false,
        items: action.payload.products,
      };

    case PRODUCT_ACTIONS_TYPE.FETCH_PRODUCTS_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload.error,
        items: [],
      };

    case PRODUCT_ACTIONS_TYPE.SORT_BY_CATEGORY:
      state.items.sort(function (a, b) {
        let nameA = a.category.name.toUpperCase();
        let nameB = b.category.name.toUpperCase();

        if (action.payload.sortKey == 'asc') {
          if (nameA < nameB) {
            return -1;
          } else if (nameA > nameB) {
            return 1;
          }
        } else {
          if (nameA < nameB) {
            return 1;
          } else if (nameA > nameB) {
            return -1;
          }
        }
        return 0;
      });

      return {
        ...state,
        loading: false,
        items: action.payload.products,
      };

    case PRODUCT_ACTIONS_TYPE.SORT_BY_PRICE:
      state.items.sort(function (a, b) {
        if (action.payload.sortKey == 'asc') {
          return a.price - b.price;
        } else {
          return b.price - a.price;
        }
        return 0;
      });

      return {
        ...state,
        loading: false,
        items: action.payload.products,
      };

    default:
      return state;
  }
};
