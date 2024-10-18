import React, { useEffect, useState } from 'react';

const Carrito = () => {
    const [carritoProductos, setCarritoProductos] = useState([]);
    const [loading, setLoading] = useState(true);

    // Función para obtener los productos del carrito del usuario
    const fetchCarrito = async () => {
        // Obtener el token de autenticación desde las cookies
        const token = document.cookie
            .split('; ')
            .find(row => row.startsWith('session='))
            ?.split('=')[1]; // Obtener el token de las cookies
            console.log("Token:", token);
        if (!token) {
            alert('Debes iniciar sesión para ver el carrito.');
            return;
        }

        try {
            const response = await fetch('http://localhost:8000/api/cart/my_cart/', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}` 
                }
            });

            if (response.ok) {
                const data = await response.json();
                setCarritoProductos(data); // Guarda los productos del carrito en el estado
            } else {
                alert('Error al obtener el carrito.');
            }
        } catch (error) {
            console.error('Error al obtener el carrito:', error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchCarrito(); // Llamar a la función al cargar el componente
    }, []);

    if (loading) {
        return <p>Cargando carrito...</p>;
    }

    return (
        <div className="container my-4">
            <h2>Tu Carrito</h2>
            {carritoProductos.length > 0 ? (
                <div className="row">
                    {carritoProductos.map((producto) => (
                        <div key={producto.producto_id} className="col-md-4 mb-4">
                            <div className="card">
                                <img src={producto.imagen} alt={producto.producto_nombre} className="card-img-top" />
                                <div className="card-body">
                                    <h5 className="card-title">{producto.producto_nombre}</h5>
                                    <p className="card-text">Cantidad: {producto.cantidad}</p>
                                    <p className="card-text">Precio: {producto.precio} CRC</p>
                                    <p className="card-text">Total: {producto.precio * producto.cantidad} CRC</p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            ) : (
                <p>No tienes productos en tu carrito.</p>
            )}
        </div>
    );
};

export default Carrito;
