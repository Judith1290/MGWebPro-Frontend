import React, { useEffect, useState } from 'react';
import { FaTrash, FaEdit, FaCreditCard } from 'react-icons/fa';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';
import { editarProductoCarrito, eliminarProductoCarrito } from '../service/cartService'
import { pagopos } from '../service/pagos'

const Carrito = () => {
    const [carritoProductos, setCarritoProductos] = useState([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

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

    const handleEditarCantidad = async (producto) => {
        const { value: nuevaCantidad } = await Swal.fire({
            title: 'Editar cantidad',
            input: 'number',
            inputLabel: 'Cantidad',
            inputPlaceholder: 'Introduce la nueva cantidad',
            showCancelButton: true,
            confirmButtonText: 'Guardar',
        });

        if (nuevaCantidad) {
            // Llamar a la API para editar la cantidad del producto en el carrito
            const result = await editarProductoCarrito(producto, parseInt(nuevaCantidad));

            if (result.success) {
                Swal.fire({
                    icon: 'success',
                    title: 'Cantidad actualizada',
                    text: 'La cantidad del producto ha sido actualizada correctamente.',
                });
                fetchCarrito(); // Actualizar el carrito después de la edición
            } else {
                Swal.fire({
                    icon: 'error',
                    title: 'Error',
                    text: result.error?.detail || 'Error al actualizar el producto.',
                });
            }
        }
    };

    // Función para manejar la eliminación de un producto del carrito
    const handleEliminarProducto = async (producto) => {
        const { isConfirmed } = await Swal.fire({
            icon: 'warning',
            title: '¿Eliminar producto?',
            text: '¿Estás seguro de que quieres eliminar este producto del carrito?',
            showCancelButton: true,
            confirmButtonText: 'Eliminar',
            cancelButtonText: 'Cancelar',
        });

        if (isConfirmed) {
            const result = await eliminarProductoCarrito(producto);

            if (result.success) {
                setCarritoProductos((prev) => prev.filter((p) => p.producto.producto_id !== producto));
                Swal.fire('Eliminado', 'El producto ha sido eliminado del carrito.', 'success');
            } else {
                Swal.fire({
                    icon: 'error',
                    title: 'Error',
                    text: 'Hubo un problema al eliminar el producto.',
                });
            }
        }
    };

    // Efecto para actualizar el carrito después de eliminar un producto
    useEffect(() => {
        fetchCarrito();
    }, []);

    // Función para ir a la página de pago

    const handleIrPago = async () => {
        try {
            const result = await pagopos();
            window.location.replace(result)

        } catch (error) {
            console.error('Error en el proceso de pago:', error);

        }
    };


    useEffect(() => {
        fetchCarrito();
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
                        <div key={e.producto.producto_id} className="col-6 col-md-4 col-lg-3 mb-4">
                            <div className="card h-100" style={{ maxWidth: '200px' }}>
                                <img
                                    src={e.producto.imagen}
                                    alt={e.producto.nombre}
                                    className="card-img-top"
                                    style={{ height: '120px', objectFit: 'contain' }}
                                />
                                <div className="card-body p-2">
                                    <h5 className="card-title" style={{ fontSize: '1rem' }}>
                                        {e.producto.nombre}
                                    </h5>
                                    <p className="card-text" style={{ fontSize: '0.9rem' }}>Cantidad: {e.cantidad}</p>
                                    <p className="card-text" style={{ fontSize: '0.9rem' }}>Precio: {e.producto.precio} CRC</p>
                                    <p className="card-text" style={{ fontSize: '0.9rem' }}>Total: {e.producto.precio * e.cantidad} CRC</p>
                                </div>
                                <div className="card-footer d-flex justify-content-around p-1">
                                    <FaEdit
                                        className="m-1"
                                        size={20}
                                        style={{ cursor: 'pointer', color: 'blue' }}
                                        onClick={() => handleEditarCantidad(e.carrito_id)}
                                    />
                                    <FaTrash
                                        className="m-1"
                                        size={20}
                                        style={{ cursor: 'pointer', color: 'red' }}
                                        onClick={() => handleEliminarProducto(e.carrito_id, e.producto_id)}
                                    />
                                    <FaCreditCard
                                        className="m-1"
                                        size={20}
                                        style={{ cursor: 'pointer', color: 'green' }}
                                        onClick={() => handleIrPago()}
                                    />
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


