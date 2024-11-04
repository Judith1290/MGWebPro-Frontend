import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

const Confirmacion = () => {
  const navigate = useNavigate();

  const handleRegresar = () => {
    navigate('/');
  };

  const query = new URLSearchParams(window.location.search);

  if (query.get('success')) {
    return (
      <div className='container d-flex flex-column justify-content-center align-items-center my-5'>
        <div className='text-center'>
          <h1 className='mb-4'>¡Pago realizado exitosamente!</h1>
          <p className='lead'>Tu pago ha sido procesado correctamente.</p>
          <p>Gracias por tu compra.</p>
          <button className='btn btn-primary' onClick={handleRegresar}>
            Regresar a la página principal
          </button>
        </div>
      </div>
    );
  }

  if (query.get('canceled')) {
    return (
      <div className='container d-flex flex-column justify-content-center align-items-center my-5'>
        <div className='text-center'>
          <h1 className='mb-4'>Su pago se ha cancelado</h1>
          <button className='btn btn-primary' onClick={handleRegresar}>
            Regresar a la página principal
          </button>
        </div>
      </div>
    );
  }
};

export default Confirmacion;
