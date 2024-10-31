import React, { useState, useEffect } from 'react';
import { getReviews, createReview, checkLoginStatus } from '../service/api_reseñas';
import { useParams } from 'react-router-dom';

const Reseña = () => {
  const { producto_id } = useParams();
  const [reviews, setReviews] = useState([]);
  const [newReview, setNewReview] = useState('');
  const [error, setError] = useState(null);
  const [valor, setValor] = useState(1);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loadingLogin, setLoadingLogin] = useState(true);

  // Manejar el rango de valor de la reseña
  const handleRangeChange = (e) => {
    setValor(e.target.value);
  };
  console.log(producto_id);

  // Verificar el estado de login
  useEffect(() => {
    const checkLogin = async () => {
      try {
        const loggedIn = await checkLoginStatus();
        setIsLoggedIn(loggedIn);
      } catch (error) {
        setError('Error al verificar el estado de login: ' + error.message);
      } finally {
        setLoadingLogin(false);
      }
    };
    checkLogin();
  }, []);

  // Obtener las reseñas del producto 
  useEffect(() => {
    if (!producto_id) return;

    const fetchReviews = async () => {
      try {
        const data = await getReviews(producto_id);
        setReviews(data);
      } catch (error) {
        setError('Error al cargar las reseñas: ' + error.message);
      }
    };

    fetchReviews();
  }, [producto_id]);

  // Manejar el envío de una nueva reseña
  const handleCreateReview = async (e) => {
    e.preventDefault();

    const reviewData = {
      comentario: newReview,
      calificacion: valor,
    };

    try {
      const createdReview = await createReview(producto_id, reviewData);
      setReviews([...reviews, createdReview]);
      setNewReview('');
    } catch (error) {
      setError('Error al crear la reseña: ' + error.message);
    }
  };

  if (loadingLogin) {
    return <p>Verificando el estado de inicio de sesión...</p>;
  }

  return (
    <div className="container mt-4">
      <h2>Reseñas del producto</h2>

      {error && <div className="alert alert-danger">{error}</div>}

      <div className="d-flex flex-wrap justify-content-start">
        {reviews.map((review) => (
          <div key={review.resena_id} className="mb-3 me-3">
            <div className="card neon-card">
              <div className="card-body">
                <p className="card-text">{review.comentario}</p>
                <p className="card-text">
                  <strong>Calificación:</strong> {review.calificacion}/5
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {isLoggedIn ? (
        <form onSubmit={handleCreateReview}>
          <div className="mb-3">
            <textarea
              className="form-control"
              rows="4"
              value={newReview}
              onChange={(e) => setNewReview(e.target.value)}
              placeholder="Escribe tu reseña"
            />
          </div>

          <div className="mb-3">
            <label htmlFor="rangeInput" className="form-label">
              Selecciona un valor (1-5):
            </label>
            <input
              type="range"
              id="rangeInput"
              className="form-range"
              min="1"
              max="5"
              value={valor}
              onChange={handleRangeChange}
            />
            <p>Valor seleccionado: {valor}</p>
          </div>

          <div className="mb-3">
            <button type="submit" className="btn btn-primary">
              Enviar reseña
            </button>
          </div>
        </form>
      ) : (
        <p>
          Debes <a href="/login">iniciar sesión</a> para escribir una reseña.
        </p>
      )}
    </div>

  );
};

export default Reseña;
