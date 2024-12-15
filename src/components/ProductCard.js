import React from 'react';
import { useNavigate } from 'react-router-dom';
import './ProductCard.css';

const ProductCard = ({ nombre, precio, categoria, foto_url, idproducto }) => {
    const navigate = useNavigate();

    const handleEdit = () => {
        // Redirige a la página de edición pasando el idproducto
        navigate(`/editar-producto/${idproducto}`);
    };

    return (
        <div className="product-card">
            <img src={foto_url || '/path/to/default-image.jpg'} alt={nombre} className="product-image" />
            <div className="product-info">
                <h3 className="product-name">{nombre}</h3>
                <p className="product-price">${precio}</p>
                <p className="product-category">{categoria}</p>
                <button
                    className="edit-button"
                    onClick={handleEdit}
                    aria-label={`Editar producto: ${nombre}`}
                >
                    Editar
                </button>

            </div>
        </div>
    );
};

export default ProductCard;
