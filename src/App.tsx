import React from 'react';
import { Routes, Route } from 'react-router-dom';
import About from './components/About';
import Home from './components/Home';
import Cart from './components/Cart';
import Contacts from './components/Contacts';
import Header from './components/Header';
import Footer from './components/Footer';
import ProductPage from './components/ProductPage';
import CatalogPage from './components/CatalogPage';
import Page404 from './components/Page404';

function App() {
  return (
    <div>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/catalog" element={<CatalogPage />} />
        <Route path="/catalog/:id" element={<ProductPage />} />
        <Route path="/contacts" element={<Contacts />} />
        <Route path="*" element={<Page404 />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
