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
import CheckoutComplete from "./components/CheckoutComplete";


function App() {
  // check localStorage for user cart
  const USERCART = "rainforestUserCart";

  // either returns object or null
  let productsInCart = localStorage.getItem(USERCART);
  // if there is a cart saved in localStorage, update cart to hold object instead of string
  if( productsInCart ) {
    // get the data at the cart endpoint, parse to object, then retrieve product info
    productsInCart = JSON.parse( localStorage.getItem(USERCART) ).products;
  } else {
    const templateCart = {
      id: 0,
      userId: 0,
      date:"",
      products:[]
    };
    productsInCart = templateCart.products;
    localStorage.setItem( USERCART, JSON.stringify(templateCart) );
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
                cartEndpoint={USERCART}
                currentCart={currentCart}
                setCurrentCart={setCurrentCart}
              />}
            />
            <Route element={
              <ProductDetails
                cartEndpoint={USERCART}
                currentCart={currentCart}
                setCurrentCart={setCurrentCart}
              />} 
              path='/product/:id'
            />
            <Route element={
              <Cart
                cartEndpoint={USERCART}
                currentCart={currentCart}
                setCurrentCart={setCurrentCart}
              />}
              path='/cart'
            />
            <Route element={<CheckoutComplete />} path="/checkout-complete" />
          </Route>

          <Route element={
            <Login
              cartEndpoint={USERCART}
              setCurrentCart={setCurrentCart}
            />}
            path='/login'
          />
          <Route element={
            <Signup
              cartEndpoint={USERCART}
              setCurrentCart={setCurrentCart}
            />}
            path='/signup'
          />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
