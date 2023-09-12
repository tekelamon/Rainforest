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
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          {/* these routes will share the navigation at top of screen */}
          <Route element={<Navigation />} path='/' >
            <Route index element={<Products />} />
            <Route element={<ProductDetails />} path='/product/:id' />
            <Route element={<Cart />} path='/cart' />
          </Route>

          <Route element={<Login />} path='/login' />
          <Route element={<Signup />} path='/signup' />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
