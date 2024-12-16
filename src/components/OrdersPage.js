import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './OrdersPage.css';

const OrdersPage = () => {
    const [ventas, setVentas] = useState([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchVentas = async () => {
            try {
                const response = await axios.get('https://backend-licoreria-o15a.onrender.com/ventas');
                setVentas(response.data);
                setLoading(false);
            } catch (error) {
                console.error('Error al obtener las ventas:', error);
                setLoading(false);
            }
        };

        fetchVentas();
    }, []);

    return (
        <div className="orders-page">
            <h2>Órdenes</h2>

            {loading ? (
                <p className="loading-text">Cargando...</p>
            ) : (
                <div className="orders-list">
                    {ventas.map((venta) => (
                        <div key={venta.idventa} className="order-card">
                            <h3 className="order-title">Venta #{venta.idventa}</h3>
                            <p className="order-info">Fecha: {new Date(venta.fechaventa).toLocaleDateString()}</p>
                            <p className="order-info">Empleado: {venta.nombreempleado}</p>
                            <p className="order-info">Cliente: {venta.nombrecliente}</p>
                            <p className="order-total">Total: ${venta.total}</p>

                            <div className="order-details">
                                <h4>Detalles:</h4>
                                <ul className="details-list">
                                    {venta.detalles.map((detalle) => (
                                        <li key={detalle.idproducto} className="detail-item">
                                            <span>{detalle.nombreproducto}</span> - 
                                            <span>{detalle.cantidadproducto} unidades</span> - 
                                            <span>${detalle.totaldetalle}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default OrdersPage;
