import React, { createContext, useState, useEffect } from 'react';

export const ProductContext = createContext();

// Crear el proveedor del contexto
export const ProductProvider = ({ children }) => {
    const [productos, setProductos] = useState([]);

   
    const fetchProductos = async () => {
        try {
            const response = await fetch('http://localhost:8000/api/inventory/products/');
            const data = await response.json();
            setProductos(data);
        } catch (error) {
            console.error('Error al obtener los productos:', error);
        }
    };

    // Ejecutar la función de obtención de productos al montar el componente
    useEffect(() => {
        fetchProductos();
    }, []);

    return (
        <ProductContext.Provider value={{ productos }}>
            {children}
        </ProductContext.Provider>
    );
};
