import React from 'react';
import { Products } from '../Products/Products';
import { Nav } from './Nav';
import { BrowserRouter, Route } from 'react-router-dom';
import { Cart } from '../Cart/Cart';

export const Header = () => {
  return (
    <BrowserRouter>
      <div>
        <Nav />
        <div>
          <Route render={() => <Products />} path="/products" />
          <Route render={() => <Cart />} path="/cart" />
        </div>
      </div>
    </BrowserRouter>
  );
};
