import React, { useState, useEffect } from "react";
import { historial } from "../service/pagos";

const Historial = () => {
  const [historialData, setHistorialData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const hanhistoria = async () => {
    try {
      const result = await historial();
      setHistorialData(result);
      setLoading(false);
      console.log("Historial exitoso:", result);
    } catch (error) {
      setError(error.message);
      setLoading(false);
      console.error("Error en el proceso de historial", error);
    }
  };

  useEffect(() => {
    hanhistoria();
  }, []);

  if (loading) {
    return <p>Cargando historial...</p>;
  }

  if (error) {
    return <p>Error al cargar el historial: {error}</p>;
  }

  return (

    <div className="mapaCont">
      <h2 className="text-center my-4">Historial de Pagos</h2>
      {historialData.length > 0 ? (
        <div className="container">
          <div className="row">
            {historialData.map((pago, index) => (
              <div className="col-md-4 mb-4" key={index}>
                <div className="card border-primary">
                  <div className="card-body">
                    {/* <h5 className="card-title">Pago ID: {pago.pago_id}</h5> */}
                    <h5 className="card-title">ID transaccion: {pago.payment_intent_id}</h5>
                    <p className="card-text">
                      <strong>Fecha:</strong> {new Date(pago.fecha_creacion).toLocaleDateString()}<br />
                      <strong>Monto:</strong> ₡{new Intl.NumberFormat('es-CR').format(pago.subtotal)}
                    </p>
                    {/* <p><strong>Estado:</strong> {pago.estado}</p> */}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <p className="text-center">No hay historial de pagos.</p>
      )}
    </div>
  );
};


export default Historial;


