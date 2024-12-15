import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './CreateProduct.css';

const CreateProduct = () => {
    const [nombreproducto, setNombreproducto] = useState('');
    const [precioventa, setPrecioventa] = useState('');
    const [categoria, setCategoria] = useState('');
    const [stockproducto, setStockproducto] = useState(''); // Añadimos stockproducto
    const [preciodistribuidor, setPreciodistribuidor] = useState(''); // Añadimos preciodistribuidor
    const [foto, setFoto] = useState(null); // Para la imagen del producto
    const [categorias, setCategorias] = useState([]);
    const navigate = useNavigate();

    // Cargar categorías al montar el componente
    useEffect(() => {
        const fetchCategorias = async () => {
            try {
                const response = await fetch('http://localhost:3000/categorias');
                const data = await response.json();
                setCategorias(data);
            } catch (error) {
                console.error('Error al cargar las categorías:', error);
            }
        };

        fetchCategorias();
    }, []);

    const handleFileChange = (e) => {
        setFoto(e.target.files[0]);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Validación simple
        if (!nombreproducto || !precioventa || !categoria || !foto || !stockproducto || !preciodistribuidor) {
            alert('Todos los campos son obligatorios.');
            return;
        }

        const formData = new FormData();
        formData.append('nombreproducto', nombreproducto);
        formData.append('precioventa', precioventa);
        formData.append('categoria', categoria);
        formData.append('stockproducto', stockproducto);
        formData.append('preciodistribuidor', preciodistribuidor);
        formData.append('foto_url', foto); // Enviamos la foto

        try {
            const response = await fetch('http://localhost:3000/productos', {
                method: 'POST',
                body: formData,
            });

            if (response.ok) {
                alert('Producto creado con éxito.');
                navigate('/productos');
            } else {
                alert('Error al crear el producto');
            }
        } catch (error) {
            console.error('Error al crear el producto:', error);
        }
    };

    return (
        <div className="create-product">
            <h2>Crear Nuevo Producto</h2>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="nombreproducto">Nombre del Producto:</label>
                    <input
                        type="text"
                        id="nombreproducto"
                        value={nombreproducto}
                        onChange={(e) => setNombreproducto(e.target.value)}
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="precioventa">Precio de Venta:</label>
                    <input
                        type="number"
                        id="precioventa"
                        value={precioventa}
                        onChange={(e) => setPrecioventa(e.target.value)}
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="categoria">Categoría:</label>
                    <select
                        id="categoria"
                        value={categoria}
                        onChange={(e) => setCategoria(e.target.value)}
                        required
                    >
                        <option value="">Seleccionar Categoría</option>
                        {categorias.map((cat) => (
                            <option key={cat.idcategoria} value={cat.idcategoria}>
                                {cat.nombrecategoria}
                            </option>
                        ))}
                    </select>
                </div>
                <div className="form-group">
                    <label htmlFor="stockproducto">Stock del Producto:</label>
                    <input
                        type="number"
                        id="stockproducto"
                        value={stockproducto}
                        onChange={(e) => setStockproducto(e.target.value)}
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="preciodistribuidor">Precio Distribuidor:</label>
                    <input
                        type="number"
                        id="preciodistribuidor"
                        value={preciodistribuidor}
                        onChange={(e) => setPreciodistribuidor(e.target.value)}
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="foto_url">Imagen del Producto:</label>
                    <input
                        type="file"
                        id="foto_url"
                        accept="image/*"
                        onChange={handleFileChange}
                        required
                    />
                </div>
                <button type="submit">Crear Producto</button>
            </form>
        </div>
    );
};

export default CreateProduct;
