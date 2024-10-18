import React, { useContext, useState, useEffect } from 'react';
import { ProductContext } from './ProductContext';
import NavBar from './navbar';
import Carrusel from './Carrusel';
import { FaShoppingCart, FaCreditCard, FaStar } from 'react-icons/fa';
import Swal from 'sweetalert2';

const Principal = () => {
    const { productos } = useContext(ProductContext);
    const [searchTerm, setSearchTerm] = useState('');
    const [usuario, setUsuario] = useState(null);

    // Función para manejar el término de búsqueda
    const handleSearch = (term) => {
        setSearchTerm(term);
    };

    // Filtrar productos según el término de búsqueda
    const filteredProductos = productos.filter(producto =>
        producto.producto_nombre &&
        producto.producto_nombre.toLowerCase().includes(searchTerm.toLowerCase())
    );

    // Función para obtener los datos del usuario autenticado
    const fetchUsuario = async () => {
        // if (!isUserLoggedIn()) return;

        try {
            const response = await fetch('http://localhost:8000/api/users/my_details/', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
                credentials: 'include',
            });

            if (response.ok) {
                const data = await response.json();
                setUsuario(data);
            } else {
                console.error('Error al obtener el usuario:', response.status);
            }
        } catch (error) {
            console.error('Error al obtener el usuario:', error);
        }
    };

    useEffect(() => {
        fetchUsuario();
    }, []);

    // Función para agregar el producto al carrito
    const handleAddToCart = async (producto) => {
       
        try {
            const response = await fetch(`http://localhost:8000/api/cart/product/${producto.producto_id}/add_to_cart/`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                credentials: 'include',

                body: JSON.stringify({
                    cantidad: 1
                }),
            });

            if (response.ok) {
                Swal.fire({
                    icon: 'success',
                    title: 'Producto agregado',
                    text: `Has agregado ${producto.producto_nombre} al carrito.`,
                });
            } else {
                Swal.fire({
                    icon: 'error',
                    title: 'Error',
                    text: 'Hubo un problema al agregar el producto al carrito.',
                });
            }
        } catch (error) {
            console.error('Error al agregar el producto al carrito:', error);
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: 'Hubo un problema con la conexión al servidor.',
            });
        }
    };

    const handleGoToPayment = () => {
        console.log('Ir a pago');
    };

    const handleGoToResena = () => {
        console.log('Ir a reseñas');
    };

    return (
        <div>
            <NavBar onSearch={handleSearch} />
            <div className="container my-4 text-center">
                <div className="bg-red-600 text-dark text-center p-4">
                    <h3 className="letras p-1">Te damos la bienvenida a nuestra página web, esperamos que puedas conseguir lo que necesitas</h3>
                    <h3 className="letras">Productos destacados.</h3>
                </div>
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




