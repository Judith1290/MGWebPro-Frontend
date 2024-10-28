// import React, { useState, useEffect } from 'react';
// import { getReviews, createReview } from '../service/api_reseñas';

// const Reseña = ({ producto_id }) => {
//   const [reviews, setReviews] = useState([]);
//   const [newReview, setNewReview] = useState('');
//   const [error, setError] = useState(null);

//   // Obtener las reseñas cuando el componente se monta
//   useEffect(() => {
//     const fetchReviews = async () => {
//       try {
//         const data = await getReviews(producto_id);
//         setReviews(data);
//       } catch (error) {
//         setError('Error al cargar las reseñas: ' + error.message);
//       }
//     };

//     fetchReviews();
//   }, [producto_id]);

//   // Manejar el envío de una nueva reseña
//   const handleCreateReview = async (e) => {
//     e.preventDefault();

//     const reviewData = {
//       content: newReview, // contenido de la reseña
//     };

//     try {
//       const createdReview = await createReview(producto_id, reviewData);
//       setReviews([...reviews, createdReview]);
//       setNewReview(''); // Limpiar el campo de la reseña
//     } catch (error) {
//       setError('Error al crear la reseña: ' + error.message);
//     }
//   };

//   return (
//     <div>
//       <h2>Reseñas del producto</h2>
//       {error && <p>{error}</p>}

//       <ul>
//         {reviews.map((review) => (
//           <li key={review.id}>{review.content}</li>
//         ))}
//       </ul>

//       <form onSubmit={handleCreateReview}>
//         <textarea
//           value={newReview}
//           onChange={(e) => setNewReview(e.target.value)}
//           placeholder="Escribe tu reseña"
//         />
//         <button type="submit">Enviar reseña</button>
//       </form>
//     </div>
//   );
// };

// export default Reseña;
import React, { useState, useEffect } from 'react';
import { getReviews, createReview } from '../service/api_reseñas';
import { useLocation, useParams } from 'react-router-dom';


const Reseña = () => {
  const { producto_id } = useParams()

  // const { producto_id } = location.state || {}; // Obtener producto_id del estado
  // console.log(producto_id);

  const [reviews, setReviews] = useState([]);
  const [newReview, setNewReview] = useState('');
  const [error, setError] = useState(null);
  const [valor, setValor] = useState(1);

  // Obtener las reseñas cuando el componente se monta
  const handleRangeChange = (e) => {
    setValor(e.target.value);
  };
  useEffect(() => {
    if (!producto_id) return; // Si no hay producto_id, no cargar reseñas

    const fetchReviews = async () => {
      try {
        const data = await getReviews(producto_id);
        console.log(producto_id);

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
      comentario: newReview, // contenido de la reseña
      calificacion: valor, // valoración de la reseña
    };
    console.log(reviewData);
    

    try {
      const createdReview = await createReview(producto_id, reviewData);
      setReviews([...reviews, createdReview]);
      setNewReview(''); // Limpiar el campo de la reseña
    } catch (error) {
      setError('Error al crear la reseña: ' + error.message);
    }
  };

  return (
    <div>
      <h2>Reseñas del producto</h2>
      {error && <p>{error}</p>}

      <ul>
        {reviews.map((review) => (
          <li key={review.resena_id}>{review.comentario}</li>
        ))}
      </ul>

      <form onSubmit={handleCreateReview}>
        <textarea
          value={newReview}
          onChange={(e) => setNewReview(e.target.value)}
          placeholder="Escribe tu reseña"
        />
        <label htmlFor="rangeInput">Selecciona un valor (1-5): </label>
        <input
          type="range"
          id="rangeInput"
          min="1"
          max="5"
          value={valor}
          onChange={handleRangeChange}
        />
        <p>Valor seleccionado: {valor}</p>
        <button type="submit">Enviar reseña</button>
      </form>
    </div>
  );
};

export default Reseña;
