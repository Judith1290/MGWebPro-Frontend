import React, { createContext, useState, useEffect } from 'react';

export const ProductContext = createContext();

export const ProductProvider = ({ children }) => {
    const [productos, setProductos] = useState([]);
    const [categorias, setCategorias] = useState([]); 

    const fetchProductos = async () => {
        try {
            const response = await fetch('http://localhost:8000/api/inventory/products/');
            const data = await response.json();
            setProductos(data);
        } catch (error) {
            console.error('Error al obtener los productos:', error);
        }
    };

    const fetchCategorias = async () => {
        try {
            const response = await fetch('http://localhost:8000/api/inventory/categories/'); 
            const data = await response.json();
            setCategorias(data);
        } catch (error) {
            console.error('Error al obtener las categorías:', error);
        }
    };

    // Ejecutar las funciones de obtención de productos y categorías al montar el componente
    useEffect(() => {
        fetchProductos();
        fetchCategorias();
    }, []);

    return (
        <ProductContext.Provider value={{ productos, categorias }}>
            {children}
        </ProductContext.Provider>
    );
};

