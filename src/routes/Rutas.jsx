import { Routes, Route } from 'react-router-dom';
import Login from '../pages/Login';
import Registro from '../pages/Registro';
import Informacion from '../pages/Informacion';
import PaginaInicio from '../pages/Inicio';
import Admi from '../pages/Admi';
import Carrito from '../pages/carrito';
import Valoracion from '../pages/valoracion';
import Histo from '../pages/histo';
import PrivateRoutes from './PrivateRoutes';
import Confirma from '../pages/confirma';

function Rutas() {
  return (
    <Routes>
      <Route path='/' element={<PaginaInicio />} />
      <Route path='/Login' element={<Login />} />
      <Route path='/Register' element={<Registro />} />
      <Route path='/Informacion' element={<Informacion />} />
      <Route
        path='/Administrador'
        element={
          <PrivateRoutes>
            <Admi />
          </PrivateRoutes>
        }
      />

      <Route path='/confirmacion' element={<Confirma />} />
      <Route path='/carrito' element={<Carrito />} />
      <Route path='/producto_id/Reseña' element={<Valoracion />} />
      <Route path='/historial' element={<Histo />} />
    </Routes>
  );
}

export default Rutas;
