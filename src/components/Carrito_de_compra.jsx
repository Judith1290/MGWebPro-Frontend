import React, { useEffect, useState } from 'react';
import { FaTrash, FaEdit } from 'react-icons/fa';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';
import { editarProductoCarrito, eliminarProductoCarrito } from '../service/cartService';
import { pagopos } from '../service/pagos';
import { checkLoginStatus } from '../service/api_reseñas';

const Carrito = () => {
    const [carritoProductos, setCarritoProductos] = useState([]);
    const [loading, setLoading] = useState(true);
    const [isLoggedIn, setIsLoggedIn] = useState(false); // Estado para verificar si está logueado
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

    // Efecto para actualizar el carrito después de eliminar un producto y verificar login
    useEffect(() => {
        const checkLoginAndFetchCart = async () => {
            const user = await checkLoginStatus();
            setIsLoggedIn(!!user); // Si hay un usuario logueado, isLoggedIn será true
            fetchCarrito(); // Llamar a la función para obtener el carrito
        };

        checkLoginAndFetchCart();
    }, []);

    // Función para ir a la página de pago solo si el usuario está logueado
    const handleIrPago = async () => {
        try {
            const user = await checkLoginStatus(); // Verificar si el usuario está logueado
            if (user) {
                const result = await pagopos(); // Si está logueado, proceder al pago
                window.location.replace(result);
            }
        } catch (error) {
            console.error('Error al verificar el login:', error);
        }
    };

    return (
        <div className="container my-4">
            <h2>Tu Carrito</h2>
            {carritoProductos.length > 0 ? (
                <>
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
                                            onClick={() => handleEliminarProducto(e.carrito_id)}
                                        />
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Botón de pago universal */}
                    <div className="d-flex justify-content-end mt-4">
                        <button className="btn btn-success" onClick={handleIrPago}>
                            Ir a Pagar
                        </button>
                    </div>
                </>
            ) : (
                <>
                    <p>No tienes productos en tu carrito.</p>
                    {!isLoggedIn && (
                        <p>
                            ¿Ya tienes cuenta?{' '}
                            <span style={{ cursor: 'pointer', color: 'blue' }} onClick={() => navigate('/login')}>
                                Inicia sesión aquí
                            </span>.
                        </p>
                    )}
                </>
            )}
        </div>
    );
};

export default Carrito;







