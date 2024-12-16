import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import NavBar from './components/NavBar';
import ProductsPage from './components/ProductsPage';
import EditProduct from './components/EditProduct';
import CreateProduct from './components/CreateProduct';  // Importa el componente
import CreateOrderPage from './components/CreateOrder';  // Importa el componente
import OrdersPage from './components/OrdersPage';  // Importa el componente

import './App.css';

const App = () => {
  const [currentPage, setCurrentPage] = useState('products');

  return (
    <Router>
        <div className="App">
            <NavBar setCurrentPage={setCurrentPage} />
            <main>
                <Routes>
                    <Route path="/productos" element={<ProductsPage />} />
                    <Route path="/editar-producto/:idproducto" element={<EditProduct />} />
                    <Route path="/crear-producto" element={<CreateProduct />} /> {/* Ruta para crear productos */}
                    <Route path="/orders-page" element={<OrdersPage />} />
                    <Route path="/create-order" element={<CreateOrderPage />} /> {/* Nueva ruta */}
                </Routes>
            </main>
        </div>
    </Router>
  );
};

export default App;
