// Importing React, React Router DOM and React-Bootstrap
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './styles/global.scss';
// import * as ReactBootstrap from 'react-bootstrap';

// Importing all the pages and components
import Navigation from './components/Navigation/Navigation';
import Footer from './components/Footer/Footer';
import HomePage from './pages/HomePage';
import ProductCategoryPage from './pages/ProductCategoryPage';
import ProductsPage from './pages/ProductsPage';

function App() {
  return (
    <Router>
      <Navigation />
      <main>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/products" element={<ProductCategoryPage />} />
          <Route path="/products/:productId" element={<ProductsPage />} />
        </Routes>
      </main>
      <Footer />
    </Router>
  );
}

export default App;
