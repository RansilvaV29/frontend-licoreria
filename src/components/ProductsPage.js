import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ProductCard from './ProductCard';
import './ProductsPage.css';

const ProductsPage = () => {
    const [productos, setProductos] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('Todas');
    const [sortOrder, setSortOrder] = useState('none');

    useEffect(() => {
        const fetchProductos = async () => {
            try {
                const response = await axios.get('https://backend-licoreria-o15a.onrender.com/productos');
                setProductos(response.data);
                setLoading(false);
            } catch (error) {
                console.error('Error al obtener los productos:', error);
                setLoading(false);
            }
        };

        fetchProductos();
    }, []);

    const filteredProductos = productos
        .filter(
            (producto) =>
                producto.nombreproducto.toLowerCase().includes(searchTerm.toLowerCase()) &&
                (selectedCategory === 'Todas' || producto.nombrecategoria === selectedCategory)
        )
        .sort((a, b) => {
            if (sortOrder === 'desc') {
                return b.precioventa - a.precioventa;
            }
            if (sortOrder === 'asc') {
                return a.precioventa - b.precioventa;
            }
            return 0;
        });

    const categories = ['Todas', ...new Set(productos.map((producto) => producto.nombrecategoria))];

    return (
        <div className="products-page">
            <h2>Gestión de Productos</h2>

            <input
                type="text"
                placeholder="Buscar productos..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="search-bar"
            />

            <div className="filters">
                <select
                    value={selectedCategory}
                    onChange={(e) => setSelectedCategory(e.target.value)}
                    className="filter-select"
                >
                    {categories.map((category) => (
                        <option key={category} value={category}>
                            {category}
                        </option>
                    ))}
                </select>

                <select
                    value={sortOrder}
                    onChange={(e) => setSortOrder(e.target.value)}
                    className="filter-select"
                >
                    <option value="none">Ordenar por</option>
                    <option value="desc">Precio Descendente</option>
                    <option value="asc">Precio Ascendente</option>
                </select>
            </div>

            {loading ? (
                <p>Cargando...</p>
            ) : (
                <div className="product-list">
                    {filteredProductos.map((producto) => (
                        <ProductCard
                            key={producto.idproducto}
                            idproducto={producto.idproducto}  // Pasar idproducto como prop
                            nombre={producto.nombreproducto}
                            precio={producto.precioventa}
                            categoria={producto.nombrecategoria}
                            foto_url={producto.foto_url}
                        />
                    ))}
                </div>
            )}
        </div>
    );
};

export default ProductsPage;
