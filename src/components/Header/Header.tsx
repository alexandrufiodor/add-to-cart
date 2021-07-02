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
          <Route render={() => <Products />} path="/add-to-cart/" />
          <Route render={() => <Cart />} path="/add-to-cart/cart/" />
        </div>
      </div>
    </BrowserRouter>
  );
};
