

export const addToCart = async (producto) => {
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
            return {
                success: true,
                message: `Has agregado ${producto.producto_nombre} al carrito.`,
            };
        } else {
            return {
                success: false,
                message: 'Hubo un problema al agregar el producto al carrito.',
            };
        }
    } catch (error) {
        console.error('Error al agregar el producto al carrito:', error);
        return {
            success: false,
            message: 'Hubo un problema con la conexión al servidor.',
        };
    }
};



export const editarProductoCarrito = async (producto, nuevaCantidad) => {
    try {
        // Realiza la solicitud PATCH al backend para actualizar la cantidad del producto en el carrito
        const response = await fetch(`http://localhost:8000/api/cart/my_cart/${producto}/`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
            },
            credentials: 'include',
            body: JSON.stringify({
                cantidad: nuevaCantidad
            }),
        });

        if (response.ok) {
            const data = await response.json();
            return { success: true, data };
        } else {
            const errorData = await response.json();
            return { success: false, error: errorData };
        }
    } catch (error) {
        console.error('Error al actualizar el producto:', error);
        return { success: false, error: 'Error de conexión con el servidor' };
    }
};





export const eliminarProductoCarrito = async (producto) => {
    try {
        const response = await fetch(`http://localhost:8000/api/cart/my_cart/${producto}/`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
            },
            credentials: 'include',
        });

        if (response.ok) {
            return { success: true };
        } else {
            const errorData = await response.json();
            return { success: false, error: errorData };
        }
    } catch (error) {
        console.error('Error al eliminar el producto:', error);
        return { success: false, error: 'Error de conexión con el servidor' };
    }
};

