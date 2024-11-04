// Importing React, React Router DOM and React-Bootstrap
import React from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import './styles/global.scss';


import Layout from './components/Layout/Layout';
import HomePage from './pages/HomePage';
import ProductCategoryPage from './pages/ProductCategoryPage';
import ProductsPage from './pages/ProductsPage';

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />, // Layout component wrapping all pages
    children: [
      {
        path: "/",
        element: <HomePage />, // Home Page with scrollable sections
      },
      {
        path: "productCategory/:id",
        element: <ProductCategoryPage />, // Products by category
      },
      {
        path: "products/:id",
        element: <ProductsPage />, // Individual product page
      },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
