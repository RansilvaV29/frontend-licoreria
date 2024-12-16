import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './CreateOrder.css';

const CreateOrder = () => {
    const [productos, setProductos] = useState([]);
    const [clientes, setClientes] = useState([]);
    const [empleados, setEmpleados] = useState([]);
    const [productosSeleccionados, setProductosSeleccionados] = useState([{ idproducto: '', cantidad: '' }]);
    const [cliente, setCliente] = useState('');
    const [empleado, setEmpleado] = useState('');
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const [productosResponse, clientesResponse, empleadosResponse] = await Promise.all([
                    axios.get('https://backend-licoreria-o15a.onrender.com/productos'),
                    axios.get('https://backend-licoreria-o15a.onrender.com/clientes'),
                    axios.get('https://backend-licoreria-o15a.onrender.com/empleados'),
                ]);

                setProductos(productosResponse.data);
                setClientes(clientesResponse.data);
                setEmpleados(empleadosResponse.data);
                setLoading(false);
            } catch (error) {
                console.error('Error al obtener datos:', error);
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    const handleProductoChange = (index, field, value) => {
        const nuevosProductos = [...productosSeleccionados];
        nuevosProductos[index][field] = value;
        setProductosSeleccionados(nuevosProductos);
    };

    const añadirProducto = () => {
        setProductosSeleccionados([...productosSeleccionados, { idproducto: '', cantidad: '' }]);
    };

    const eliminarProducto = (index) => {
        const nuevosProductos = productosSeleccionados.filter((_, i) => i !== index);
        setProductosSeleccionados(nuevosProductos);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Validar si hay productos seleccionados
        if (productosSeleccionados.some(producto => !producto.idproducto || !producto.cantidad)) {
            alert("Por favor, complete todos los campos de productos.");
            return;
        }

        const ventaData = {
            idempleado: empleado,
            idcliente: cliente,
            productos: productosSeleccionados.map(producto => ({
                idproducto: producto.idproducto,
                cantidadproducto: parseInt(producto.cantidad, 10)
            }))
        };

        try {
            const response = await axios.post('https://backend-licoreria-o15a.onrender.com/ventas', ventaData);
            alert(response.data.message);
        } catch (error) {
            console.error("Error al crear la venta:", error);
            alert("Error al crear la venta.");
        }
    };

    return (
        <div className="create-order">
            <h2>Crear Orden</h2>

            {loading ? (
                <p>Cargando datos...</p>
            ) : (
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label htmlFor="cliente">Cliente:</label>
                        <select
                            id="cliente"
                            value={cliente}
                            onChange={(e) => setCliente(e.target.value)}
                            required
                        >
                            <option value="">Selecciona un cliente</option>
                            {clientes.map((cliente) => (
                                <option key={cliente.idcliente} value={cliente.idcliente}>
                                    {cliente.nombrecliente}
                                </option>
                            ))}
                        </select>
                    </div>

                    <div className="form-group">
                        <label htmlFor="empleado">Empleado:</label>
                        <select
                            id="empleado"
                            value={empleado}
                            onChange={(e) => setEmpleado(e.target.value)}
                            required
                        >
                            <option value="">Selecciona un empleado</option>
                            {empleados.map((empleado) => (
                                <option key={empleado.idempleado} value={empleado.idempleado}>
                                    {empleado.nombreempleado}
                                </option>
                            ))}
                        </select>
                    </div>

                    <h3>Productos</h3>
                    {productosSeleccionados.map((productoSeleccionado, index) => (
                        <div key={index} className="producto-item">
                            <select
                                value={productoSeleccionado.idproducto}
                                onChange={(e) => handleProductoChange(index, 'idproducto', e.target.value)}
                                required
                            >
                                <option value="">Selecciona un producto</option>
                                {productos.map((producto) => (
                                    <option key={producto.idproducto} value={producto.idproducto}>
                                        {producto.nombreproducto} - ${producto.precioventa}
                                    </option>
                                ))}
                            </select>
                            <input
                                type="number"
                                placeholder="Cantidad"
                                value={productoSeleccionado.cantidad}
                                onChange={(e) => handleProductoChange(index, 'cantidad', e.target.value)}
                                min="1"
                                required
                            />
                            {index > 0 && (
                                <button type="button" onClick={() => eliminarProducto(index)}>
                                    Eliminar
                                </button>
                            )}
                        </div>
                    ))}

                    <button type="button" onClick={añadirProducto}>
                        Añadir Producto
                    </button>

                    <button type="submit">Crear Orden</button>
                </form>
            )}
        </div>
    );
};

export default CreateOrder;
