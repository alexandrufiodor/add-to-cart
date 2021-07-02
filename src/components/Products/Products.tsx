import React, { useCallback, useEffect, useState } from 'react';
import { fetchProducts, sortByCategoryAC, sortByPriceAC } from '../../state/actions/productActions';
import { useDispatch, useSelector } from 'react-redux';
import { AppRootStateType } from '../../state/store';
import { FetchProductsStateType } from '../../state/reducers/productReducer';
import s from './Products.module.css';
import { CartStateType } from '../../state/reducers/cartReducer';
import { addToCartAC } from 'state/actions/cartActions';

export const Products = () => {
  const [stateCategory, setStateCategory] = useState(true);
  const [statePrice, setStatePrice] = useState(true);
  const getProducts = useSelector<AppRootStateType, FetchProductsStateType>((state) => state.fetch_products);
  // const cart = useSelector<AppRootStateType, CartStateType>(state => state.cart);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchProducts());
  }, []);

  const addToCartClick = useCallback(function (product, productId) {
    dispatch(addToCartAC(product, productId));
  }, []);

  const sortByCategoryAscClick = useCallback(
    function () {
      dispatch(sortByCategoryAC(getProducts.items, 'asc'));
      setStateCategory(false);
    },
    [getProducts.items],
  );

  const sortByCategoryDescClick = useCallback(
    function () {
      dispatch(sortByCategoryAC(getProducts.items, 'desc'));
      setStateCategory(true);
    },
    [getProducts.items],
  );

  const sortByPriceAscClick = useCallback(
    function () {
      dispatch(sortByPriceAC(getProducts.items, 'asc'));
      setStatePrice(false);
    },
    [getProducts.items],
  );

  const sortByPriceDescClick = useCallback(
    function () {
      dispatch(sortByPriceAC(getProducts.items, 'desc'));
      setStatePrice(true);
    },
    [getProducts.items],
  );

  return (
    <div>
      <table className={s.table}>
        <thead>
          <tr>
            {stateCategory ? (
              <th className={s.tableCell} onClick={() => sortByCategoryAscClick()}>
                Category ↑
              </th>
            ) : (
              <th className={s.tableCell} onClick={() => sortByCategoryDescClick()}>
                Category ↓
              </th>
            )}

            <th className={s.tableCell}>Name</th>
            {statePrice ? (
              <th className={s.tableCell} onClick={() => sortByPriceAscClick()}>
                Price ↑
              </th>
            ) : (
              <th className={s.tableCell} onClick={() => sortByPriceDescClick()}>
                Price ↓
              </th>
            )}
            <th className={s.tableCell}>Actions</th>
          </tr>
        </thead>
        <tbody>
          {getProducts.items.map((product) => (
            <tr key={product.id}>
              <td className={s.tableCell} key={product.category.id}>
                {product.category.name}
              </td>
              <td className={s.tableCell}>{product.name}</td>
              <td className={s.tableCell}>${product.price}</td>
              <td className={s.tableCell}>
                <button
                  onClick={() => {
                    addToCartClick(product, product.id);
                  }}
                >
                  Add to Cart
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
