import React, { useContext, useState, useEffect } from 'react';
import { ProductContext } from '../context/ProductContext';
import NavBar from './Navbar';
import Carrusel from './Carrusel';
import { FaShoppingCart, FaCreditCard, FaStar } from 'react-icons/fa';
import Swal from 'sweetalert2';
import { addToCart } from '../service/cartService';
import { fetchUsuario } from '../service/principal';
import { useNavigate } from 'react-router-dom';

const Principal = () => {
    const navigate = useNavigate();
    const { productos } = useContext(ProductContext);
    const [searchTerm, setSearchTerm] = useState('');
    const [usuario, setUsuario] = useState(null);

    const handleSearch = (term) => {
        setSearchTerm(term);
    };

    const filteredProductos = productos.filter(producto =>
        producto.is_active &&
        producto.nombre &&
        producto.nombre.toLowerCase().includes(searchTerm.toLowerCase())
    );

    useEffect(() => {
        const obtenerUsuario = async () => {
            const data = await fetchUsuario();
            setUsuario(data);
        };

        obtenerUsuario();
    }, []);

    const handleAddToCart = async (producto) => {
        const result = await addToCart(producto);

        if (result.success) {
            Swal.fire({
                icon: 'success',
                title: 'Producto agregado',
                text: result.message,
            });
        } else {
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: result.message,
            });
        }
    };

    const handleGoToPayment = () => {
        console.log('Ir a pago');
    };

    const handleGoToResena = (producto_id) => {
        navigate(`${producto_id}/Reseña`);
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
                                <h3>{producto.nombre}</h3>
                                <img
                                src={producto.imagen}
                                alt={producto.nombre}
                                className="img-fluid"
                                style={{
                                    width: '150px',
                                    height: '150px',
                                    objectFit: 'cover',
                                    borderRadius: '8px'
                                }}
                            />
                                
                                <p>{producto.descripcion}</p>
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
                                        onClick={() => handleGoToResena(producto.producto_id)}
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



