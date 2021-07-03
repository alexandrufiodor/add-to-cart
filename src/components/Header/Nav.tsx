import React from 'react';
import { NavLink } from 'react-router-dom';
import s from './Nav.module.css';

export const Nav = () => {
  return (
    <nav className={s.nav}>
      <div className={s.navItem}>
        <NavLink activeClassName={s.active} to="/products">
          All Products
        </NavLink>
      </div>
      <div className={s.navItem}>
        <NavLink activeClassName={s.active} to="/cart/">
          Cart
        </NavLink>
      </div>
    </nav>
  );
};
