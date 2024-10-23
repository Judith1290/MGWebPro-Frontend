
import React, { useState, useEffect } from 'react';
import {getReviews,getReview, createReview, editReview} from '../service/api_reseñas'

const Reseña = ({ productId }) => {
  const [reviews, setReviews] = useState([]);
  const [newReview, setNewReview] = useState('');
  const [error, setError] = useState(null);

  // Obtener las reseñas cuando el componente se monta
  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const data = await getReviews(productId);
        setReviews(data);
      } catch (error) {
        setError('Error al cargar las reseñas');
      }
    };

    fetchReviews();
  }, [productId]);

  // Manejar el envío de una nueva reseña
  const handleCreateReview = async (e) => {
    e.preventDefault();

    const reviewData = {
      content: newReview, // contenido de la reseña
    };

    try {
      const createdReview = await createReview(productId, reviewData);
      setReviews([...reviews, createdReview]);
      setNewReview(''); // Limpiar el campo de la reseña
    } catch (error) {
      setError('Error al crear la reseña');
    }
  };

  return (
    <div>
      <h2>Reseñas del producto</h2>
      {error && <p>{error}</p>}

      <ul>
        {reviews.map((review) => (
          <li key={review.id}>{review.content}</li>
        ))}
      </ul>

      <form onSubmit={handleCreateReview}>
        <textarea
          value={newReview}
          onChange={(e) => setNewReview(e.target.value)}
          placeholder="Escribe tu reseña"
        />
        <button type="submit">Enviar reseña</button>
      </form>
    </div>
  );
};

export default Reseña;
