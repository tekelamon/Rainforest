import { useState } from "react";
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import './App.css';

// pages
import Navigation from './components/Navigation';   // navigation across top of screen
import Products from './components/Products';       // main browsing page of products
import ProductDetails from './components/ProductDetails'; // individual product details
import Cart from './components/Cart';               // entire cart

import Login from './components/Login';             // login page
import Signup from './components/Signup';           // signup page


function App() {
  // check localStorage for user sign in
  const USERACC = "rainforestUserAccount";
  const USERCART = "rainforestUserCart";

  // either returns object or null
  let productsInCart = localStorage.getItem(USERCART);
  // if there is a cart saved in localStorage, update cart to hold object instead of string
  if( productsInCart ) {
    // get the data at the cart endpoint, parse to object, then retrieve product info
    productsInCart = JSON.parse( localStorage.getItem(USERCART) ).products;
  }

  const [currentCart, setCurrentCart] = useState(productsInCart);

  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          {/* these routes will share the navigation at top of screen */}
          <Route element={<Navigation />} path='/' >
            <Route index element={
              <Products
                userEndpoint={USERACC}
                cartEndpoint={USERCART}
              />}
            />
            <Route element={
              <ProductDetails
                userEndpoint={USERACC}
                cartEndpoint={USERCART}
              />} 
              path='/product/:id'
            />
            <Route element={
              <Cart
                userEndpoint={USERACC}
                cartEndpoint={USERCART}
                currentCart={currentCart}
                setCurrentCart={setCurrentCart}
              />}
              path='/cart'
            />
          </Route>

          <Route element={
            <Login
              userEndpoint={USERACC}
              cartEndpoint={USERCART}
            />}
            path='/login'
          />
          <Route element={
            <Signup
              userEndpoint={USERACC}
              cartEndpoint={USERCART}
            />}
            path='/signup'
          />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
