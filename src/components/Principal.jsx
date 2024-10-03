import React from 'react';
import Carrusel from './Carrusel';

function Principal() {
    return (
        <>
            <div className="bg-red-600 text-dark text-center p-4">

                <h3 className='letras p-1'>Te damos la bienvenida a nuestra página web, esperamos que puedas conseguir lo que necesitas</h3>
                <h3 className="letras">Productos destacados.</h3>

            </div>
            <div className="container my-4 text-center"> 
                <div className="mx-auto" style={{ maxWidth: '900px' }}> {/* Ajustar el ancho  */}
                    <Carrusel />
                </div>
            </div>
        </>
    );
}
export default Principal;
