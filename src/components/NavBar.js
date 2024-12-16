import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import './NavBar.css';

const NavBar = () => {
    const location = useLocation();
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

    // Cierra el menú cuando se hace clic en un enlace (esto es para mejorar la UX en móviles)
    const closeMenu = () => setIsMenuOpen(false);

    return (
        <nav>
            <div className="logo">Cesar Licor Store</div>
            <div className={`menu ${isMenuOpen ? 'open' : ''}`}>
                <ul>
                    <li>
                        <Link
                            to="/productos"
                            className={location.pathname === '/productos' ? 'active' : ''}
                            onClick={closeMenu}  // Cierra el menú al hacer clic en el enlace
                        >
                            Productos
                        </Link>
                    </li>
                    <li>
                        <Link
                            to="/create-order"
                            className={location.pathname === '/create-order' ? 'active' : ''}
                            onClick={closeMenu}
                        >
                            Órdenes
                        </Link>
                    </li>
                    <li>
                        <Link
                            to="/orders-page"
                            className={location.pathname === '/orders-page' ? 'active' : ''}
                            onClick={closeMenu}
                        >
                            Ver Órdenes
                        </Link>
                    </li>
                    <li>
                        <Link
                            to="/crear-producto"
                            className={location.pathname === '/crear-producto' ? 'active' : ''}
                            onClick={closeMenu}
                        >
                            Crear Producto
                        </Link>
                    </li>
                </ul>
            </div>
            <button className="hamburger" onClick={toggleMenu}>
                ☰
            </button>
        </nav>
    );
};

export default NavBar;
