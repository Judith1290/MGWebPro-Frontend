import React, { useContext, useState } from 'react';
import { ProductContext } from './ProductContext'; 
import NavBar from './navbar';
import Carrusel from './Carrusel'; 
import { FaShoppingCart, FaCreditCard, FaStar } from 'react-icons/fa';

const Principal = () => {
    const { productos } = useContext(ProductContext); 
    const [searchTerm, setSearchTerm] = useState('');

    // Función para manejar el término de búsqueda
    const handleSearch = (term) => {
        setSearchTerm(term);
    };

    // Filtrar productos según el término de búsqueda
    const filteredProductos = productos.filter(producto => 
        producto.producto_nombre && 
        producto.producto_nombre.toLowerCase().includes(searchTerm.toLowerCase())
    );

    // Funciones para manejar acciones
    const handleAddToCart = (producto) => {
        // Lógica para agregar el producto al carrito
        console.log('Producto agregado al carrito:', producto);
    };

    const handleGoToPayment = () => {
        // Lógica para ir al proceso de pago
        console.log('Ir a pago');
    };

    const handleGoToResena = () => {
        // Lógica para ir a reseñas
        console.log('Ir a reseñas');
    };

    return (
        <div>
            <NavBar onSearch={handleSearch} />
            <div className="container my-4 text-center">
                <div className="mx-auto" style={{ maxWidth: '900px' }}>
                    <Carrusel />
                </div>

                <div className="productos-destacados">
                    {filteredProductos.length > 0 ? (
                        filteredProductos.map((producto) => (
                            <div key={producto.producto_id} className="producto-item">
                                <h3>{producto.producto_nombre}</h3>
                                <img src={producto.imagen} alt={producto.producto_nombre} />
                                <p>{producto.producto_descripcion}</p>
                                <p>Precio: {producto.precio} CRC</p>

                                <div className="d-flex justify-content-center">
                                    <FaShoppingCart
                                        className="m-2"
                                        size={24} 
                                        style={{ cursor: 'pointer', color: 'blue' }} 
                                        onClick={() => handleAddToCart(producto)} 
                                    />
                                    <FaCreditCard
                                        className="m-2"
                                        size={24}
                                        style={{ cursor: 'pointer', color: 'green' }}
                                        onClick={handleGoToPayment} 
                                    />
                                    <FaStar
                                        className="m-2"
                                        size={24}
                                        style={{ cursor: 'pointer', color: 'orange' }}
                                        onClick={handleGoToResena} 
                                    />
                                </div>
                            </div>
                        ))
                    ) : (
                        <p>No hay productos disponibles</p>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Principal;







