import React, { useEffect, useState } from 'react';

const Carrito = () => {
    const [carritoProductos, setCarritoProductos] = useState([]);
    const [loading, setLoading] = useState(true);

    // Función para obtener los productos del carrito del usuario
    const fetchCarrito = async () => {
       

        try {
            const response = await fetch('http://localhost:8000/api/cart/my_cart/', {
                method: 'GET',
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json',
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
                    {carritoProductos.map((e) => (
                        <div key={e.producto.producto_id} className="col-md-4 mb-4">
                            <div className="card">
                                <img src={e.producto.imagen} alt={e.producto.producto_nombre} className="card-img-top" />
                                <div className="card-body">
                                    <h5 className="card-title">{e.producto.producto_nombre}</h5>
                                    <p className="card-text">Cantidad: {e.cantidad}</p>
                                    <p className="card-text">Precio: {e.producto.precio} CRC</p>
                                    <p className="card-text">Total: {e.producto.precio * e.cantidad} CRC</p>
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
