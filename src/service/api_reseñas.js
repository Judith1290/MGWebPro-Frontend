// Obtener todas las reseñas de un producto

export const getReviews = async (resena_id) => {
    const response = await fetch(`http://localhost:8000/api/reviews/product/${resena_id.producto_id}/`);
    if (!response.ok) {
        throw new Error('Error al obtener las reseñas');
    }
    return response.json();
};
  
  // Obtener una reseña específica
  export const getReview = async (producto_id, resena_id) => {
    const response = await fetch(`http://localhost:8000/api/reviews//product/${producto_id}/comment/${resena_id}/`);
    if (!response.ok) {
      throw new Error('Error al obtener la reseña');
    }
    return response.json();
  };
  
  // Crear una nueva reseña
  export const createReview = async (productId, reviewData) => {
    const response = await fetch(`${falta}/product/${productId}/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
      body: JSON.stringify(reviewData),
    });
    
    if (!response.ok) {
      throw new Error('Error al crear la reseña');
    }
    return response.json();
  };
  
  // Editar una reseña existente
  export const editReview = async (producto_id,resena_id) => {
    const response = await fetch(`http://localhost:8000/api/reviews//product/${producto_id}/comment/${resena_id}/`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
      body: JSON.stringify(reviewData),
    });
    
    if (!response.ok) {
      throw new Error('Error al editar la reseña');
    }
    return response.json();
  };