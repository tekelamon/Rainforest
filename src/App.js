import { useState } from 'react';
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
  const [userAccount, setUserAccount] = useState( localStorage.getItem(`${USERACC}`) );

  const USERCART = "rainforestUserCart";
  const [userCart, setUserCart] = useState( localStorage.getItem(`${USERCART}`) );

  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          {/* these routes will share the navigation at top of screen */}
          <Route element={<Navigation />} path='/' >
            <Route index element={
              <Products
                userAccount={userAccount}
                cartEndpoint={USERCART}
              />}
            />
            <Route element={
              <ProductDetails
                userAccount={userAccount}
                cartEndpoint={USERCART}
              />} 
              path='/product/:id'
            />
            <Route element={
              <Cart
                userAccount={userAccount}
                cartEndpoint={USERCART}
              />}
              path='/cart'
            />
          </Route>

          <Route element={
            <Login
              setUserAccount={setUserAccount}
              userEndpoint={USERACC}
              setUserCart={setUserCart}
              cartEndpoint={USERCART}
            />}
            path='/login'
          />
          <Route element={
            <Signup
              setUserAccount={setUserAccount}
              userEndpoint={USERACC}
            />}
            path='/signup'
          />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
