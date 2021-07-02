import { combineReducers, createStore, applyMiddleware } from 'redux';
import { ProductReducer } from './reducers/productReducer';
import thunkMiddleware from 'redux-thunk';
import { CartReducer } from './reducers/cartReducer';

const rootReducer = combineReducers({
  fetch_products: ProductReducer,
  cart: CartReducer,
});

export type AppRootStateType = ReturnType<typeof rootReducer>;

export const store = createStore(rootReducer, applyMiddleware(thunkMiddleware));

// @ts-ignore
window.store = store;
