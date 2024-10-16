
import Carrusel from './Carrusel';

import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { ProductContext } from './ProductContext';
import { FaShoppingCart, FaCreditCard, FaStar } from 'react-icons/fa'; 


function Principal() {
    // Acceder a los productos desde el contexto
    const { productos } = useContext(ProductContext);  
    const navigate = useNavigate();

    const handleAddToCart = (producto) => {
        let cart = JSON.parse(localStorage.getItem('cart')) || [];
        cart.push(producto);
        localStorage.setItem('cart', JSON.stringify(cart));
        alert(`Agregaste ${producto.producto_nombre} al carrito.`);
    };

    const handleGoToPayment = () => {
        navigate('');
    };

    const handleGoToResena = () => {
        navigate('');
    };

    return (
        <>
            <div className="bg-red-600 text-dark text-center p-4">
                <h3 className='letras p-1'>Te damos la bienvenida a nuestra página web, esperamos que puedas conseguir lo que necesitas</h3>
                <h3 className="letras">Productos destacados.</h3>
            </div>

            <div className="container my-4 text-center">
                <div className="mx-auto" style={{ maxWidth: '900px' }}>
                    <Carrusel />
                </div>

                <div className="productos-destacados">
                    {productos.length > 0 ? (
                        productos.map((producto) => (
                            <div key={producto.producto_id} className="producto-item">
                                <h3>{producto.producto_nombre}</h3>
                                <img src={producto.imagen} alt={producto.producto_nombre} className="img-fluid" />
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
                        <p>No hay productos disponibles.</p>
                    )}
                </div>
            </div>
        </>
    );
}

export default Principal;





// function Principal() {
//     return (
//         <>
//             <div className="bg-red-600 text-dark text-center p-4">

//                 <h3 className='letras p-1'>Te damos la bienvenida a nuestra página web, esperamos que puedas conseguir lo que necesitas</h3>
//                 <h3 className="letras">Productos destacados.</h3>

//             </div>
//             <div className="container my-4 text-center"> 
//                 <div className="mx-auto" style={{ maxWidth: '900px' }}> 
//                     <Carrusel />
//                 </div>
//             </div>
//         </>
//     );
// }
// export default Principal;
