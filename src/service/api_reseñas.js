// Verificar si el usuario está autenticado
export const checkLoginStatus = async () => {
  const response = await fetch('http://localhost:8000/api/users/my_details/', {
    method: 'GET',
    credentials: 'include',
  });

  if (response.ok) {
    const data = await response.json();
    console.log("Datos del usuario logueado:", data);
    return data;
  } else {
    console.error("Error al verificar el estado de login:", response.status);
    throw new Error('Error al verificar el estado de login');
  }
};

// Obtener todas las reseñas de un producto
export const getReviews = async (producto_id) => {
  const response = await fetch(`http://localhost:8000/api/reviews/product/${producto_id}/`);
  if (!response.ok) {
    throw new Error('Error al obtener las reseñas');
  }
  return response.json();
};

// Obtener una reseña específica
export const getReview = async (producto_id, resena_id) => {
  const response = await fetch(`http://localhost:8000/api/reviews/product/${producto_id}/comment/${resena_id}/`);
  if (!response.ok) {
    throw new Error('Error al obtener la reseña');
  }
  return response.json();
};

// Crear una nueva reseña
export const createReview = async (producto_id, reviewData) => {
  // Verificar si el usuario está autenticado
  const isLoggedIn = await checkLoginStatus();
  if (!isLoggedIn) {
    throw new Error('Debes iniciar sesión para crear una reseña');
  }

  // Si el usuario está logueado, permitir la creación de la reseña
  const response = await fetch(`http://localhost:8000/api/reviews/product/${producto_id}/`, {
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
export const editReview = async (producto_id, resena_id, reviewData) => {
  const response = await fetch(`http://localhost:8000/api/reviews/product/${producto_id}/comment/${resena_id}/`, {
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
