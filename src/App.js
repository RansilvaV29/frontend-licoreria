import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import NavBar from './components/NavBar';
import ProductsPage from './components/ProductsPage';
import EditProduct from './components/EditProduct';
import CreateProduct from './components/CreateProduct';  // Importa el componente
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
                </Routes>
            </main>
        </div>
    </Router>
  );
};

export default App;
