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
  // check localStorage for user sign in ( either id or null )
  const USERACC = "rainforestUserAccount";
  const [userAccount, setUserAccount] = useState( localStorage.getItem(`${USERACC}`) );

  const [userCart, setUserCart] = useState(null);

  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          {/* these routes will share the navigation at top of screen */}
          <Route element={<Navigation />} path='/' >
            {/* 
              TODO access user info to generate content for cart usage
                like add to cart, view cart, checkout
            */}
            <Route index element={
              <Products
                userAccount={userAccount}
              />}
            />
            <Route element={
              <ProductDetails
                userAccount={userAccount}
              />} 
              path='/product/:id'
            />
            <Route element={
              <Cart
                userAccount={userAccount}
              />}
              path='/cart'
            />
          </Route>

          {/* TODO update user info on successful login/signup */}
          <Route element={
            <Login
              setUserAccount={setUserAccount}
              userEndpoint={USERACC}
              setUserCart={setUserCart}
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
