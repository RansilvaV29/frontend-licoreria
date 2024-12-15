import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import './EditProduct.css';

const EditProduct = () => {
  const { idproducto } = useParams(); // Obtener el id del producto desde la URL
  const navigate = useNavigate();

  const [product, setProduct] = useState({
    nombreproducto: '',
    precioventa: '',
    categoria: '',  // Esto se mantendrá como el id de la categoría seleccionada
    foto_url: '',
  });

  const [categories, setCategories] = useState([]); // Para almacenar las categorías
  const [newImage, setNewImage] = useState(null); // Para almacenar la nueva imagen seleccionada

  // Obtener las categorías desde la API
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch('https://backend-licoreria-o15a.onrender.com/categorias');
        const data = await response.json();
        setCategories(data); // Guardamos las categorías
      } catch (error) {
        console.error('Error al obtener las categorías:', error);
      }
    };

    fetchCategories();
  }, []);

  // Obtener los detalles del producto
  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await fetch(`https://backend-licoreria-o15a.onrender.com/productos/${idproducto}`);
        const data = await response.json();
        setProduct(data[0]); // Suponiendo que la respuesta es un array con un solo producto
      } catch (error) {
        console.error('Error al obtener los detalles del producto:', error);
      }
    };

    fetchProduct();
  }, [idproducto]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProduct((prevProduct) => ({
      ...prevProduct,
      [name]: value,
    }));
  };

  const handleImageChange = (e) => {
    setNewImage(e.target.files[0]); // Almacena el archivo de la nueva imagen
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('nombreproducto', product.nombreproducto);
    formData.append('precioventa', product.precioventa);
    formData.append('categoria', product.categoria);

    // Añadir la imagen solo si se ha seleccionado una
    if (newImage) {
      formData.append('foto_url', newImage);
    }else{
      formData.append('foto_url', product.foto_url);
    }

    try {
      const response = await fetch(`https://backend-licoreria-o15a.onrender.com/productos/${idproducto}`, {
        method: 'PUT',
        body: formData, // Aquí se envía el FormData con la imagen
      });

      if (response.ok) {
        alert('Producto actualizado con exito');
        navigate(`/productos`);
      } else {
        alert('Error al actualizar el producto');
      }
    } catch (error) {
      console.error('Error al actualizar el producto:', error);
    }
  };


  return (
    <div className="edit-product">
      <h2>Editar Producto</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="nombreproducto">Nombre:</label>
          <input
            type="text"
            id="nombreproducto"
            name="nombreproducto"
            value={product.nombreproducto}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label htmlFor="precioventa">Precio:</label>
          <input
            type="number"
            id="precioventa"
            name="precioventa"
            value={product.precioventa}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label htmlFor="categoria">Categoría:</label>
          <select
            id="categoria"
            name="categoria"
            value={product.categoria}
            onChange={handleChange}
            required
          >
            <option value="">Selecciona una categoría</option>
            {categories.map((category) => (
              <option key={category.idcategoria} value={category.idcategoria}>
                {category.nombrecategoria}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label htmlFor="foto_url">Imagen:</label>
          <input
            type="file"
            id="foto_url"
            name="foto_url"
            onChange={handleImageChange}
          />
          {product.foto_url && !newImage && (
            <div>
              <img src={product.foto_url} alt="Foto actual" width="100" />
            </div>
          )}
        </div>
        <button type="submit">Actualizar Producto</button>
      </form>
    </div>
  );
};

export default EditProduct;
