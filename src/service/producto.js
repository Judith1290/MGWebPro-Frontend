export const toggleProductActive = async (producto_id, isActive) => {
    try {
        const response = await fetch(`http://localhost:8000/api/inventory/products/${producto_id}/change_status/`, {
            method: 'POST',
            credentials: 'include',
        });

        if (!response.ok) {
            throw new Error('Error al activar/desactivar el producto');
        }
    } catch (error) {
        console.error('Error toggling product active:', error);
        throw error;
    }
};



// Función para obtener todos los productos
export const fetchProductos = async (setProductos) => {
    try {
        const response = await fetch('http://localhost:8000/api/inventory/products/', {
            method: 'GET',
            credentials: 'include',
        });
        if (!response.ok) {
            throw new Error('Error en la respuesta del servidor');
        }
        const data = await response.json();
        setProductos(data);
    } catch (error) {
        console.error('Error al obtener productos:', error);
    }
};

// Función para obtener modelos y categorías
export const fetchModelosYCategorias = async (setModelos, setCategorias) => {
    try {
        const modelosResponse = await fetch('http://localhost:8000/api/inventory/models/', {
            method: 'GET',
            credentials: 'include',
        });
        if (!modelosResponse.ok) {
            throw new Error('Error al obtener modelos');
        }
        const modelosData = await modelosResponse.json();
        setModelos(modelosData);

        const categoriasResponse = await fetch('http://localhost:8000/api/inventory/categories/', {
            method: 'GET',
            credentials: 'include',
        });
        if (!categoriasResponse.ok) {
            throw new Error('Error al obtener categorías');
        }
        const categoriasData = await categoriasResponse.json();
        setCategorias(categoriasData);
    } catch (error) {
        console.error('Error al obtener modelos o categorías:', error);
    }
};

// Función para guardar o actualizar un producto
export const saveOrUpdateProduct = async (productData, isEditing, producto_id) => {
    try {
        const response = isEditing
            ? await fetch(`http://localhost:8000/api/inventory/products/${producto_id}/`, {
                method: 'PATCH',
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(productData),
            })
            : await fetch('http://localhost:8000/api/inventory/products/', {
                method: 'POST',
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(productData),
            });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.detail || 'Ocurrió un error al guardar el producto.');
        }
    } catch (error) {
        console.error('Error al enviar datos:', error);
        throw error;
    }
};
