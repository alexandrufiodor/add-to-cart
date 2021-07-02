import React, { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppRootStateType } from '../../state/store';
import s from './Cart.module.css';
import { CartStateType } from '../../state/reducers/cartReducer';
import { removeFromCartAC, updateCartQuantityAC } from 'state/actions/cartActions';

export const Cart = () => {
  const cart = useSelector<AppRootStateType, CartStateType>((state) => state.cart);

  const dispatch = useDispatch();

  const updateCart = useCallback(
    function (productId, quantity) {
      dispatch(updateCartQuantityAC(productId, quantity));
    },
    [dispatch],
  );

  const removeFromCartClick = useCallback(function (id, quantity) {
    dispatch(removeFromCartAC(id, quantity));
  }, []);

  return (
    <div>
      <table className={s.table}>
        <thead>
          <tr>
            <th className={s.tableCell}>Category</th>

            <th className={s.tableCell}>Name</th>

            <th className={s.tableCell}>Price</th>
            <th className={s.tableCell}>Quantity</th>
            <th className={s.tableCell}>Actions</th>
          </tr>
        </thead>
        <tbody>
          {cart.cart.map((p) => (
            <tr key={p.product.id}>
              <td className={s.tableCell} key={p.product.category.id}>
                {p.product.category.name}
              </td>
              <td className={s.tableCell}>{p.product.name}</td>
              <td className={s.tableCell}>${(p.product.price * p.quantity).toFixed(2)}</td>
              <td className={s.tableCell}>{p.quantity}</td>
              <td className={s.tableCell}>
                <button
                  onClick={() => {
                    removeFromCartClick(p.product.id, p.quantity);
                  }}
                >
                  -
                </button>
                Remove{' '}
                <button
                  onClick={() => {
                    updateCart(p.product.id, p.quantity);
                  }}
                >
                  +
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
