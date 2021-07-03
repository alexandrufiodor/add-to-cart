import { ProductType } from '../../api/api';
import { CART_ACTIONS_TYPE, CartActionsType } from '../actions/cartActions';

const initialState: CartStateType = {
  cart: [],
};

export type CartStateType = {
  cart: Array<CartProductStateType>;
};

type CartProductStateType = {
  product: ProductType;
  quantity: number;
};

export const CartReducer = (state: CartStateType = initialState, action: CartActionsType): CartStateType => {
  let cart = [...state.cart];
  switch (action.type) {
    case CART_ACTIONS_TYPE.ADD_TO_CART: {
      let item = cart.find((item) => item.product.id == action.payload.productId);
      if (item) {
        action.payload.quantity = item.quantity++;
      } else {
        cart.push({ ...action.payload });
      }
      return {
        ...state,
        cart,
      };
    }
    case CART_ACTIONS_TYPE.REMOVE_FROM_CART: {
      let item = cart.find((item) => item.product.id == action.payload.productId);

      if (item && item.quantity > 1) {
        item.quantity = action.payload.quantity - 1;
      } else {
        cart = cart.filter((item) => item.product.id != action.payload.productId);
      }

      return {
        ...state,
        cart,
      };
    }
    case CART_ACTIONS_TYPE.UPDATE_CART_QUANTITY: {
      let item = cart.find((item) => item.product.id == action.payload.productId);

      item && (item.quantity = action.payload.quantity + 1);

      return {
        ...state,
        cart: cart,
      };
    }
  }
  return state;
};
