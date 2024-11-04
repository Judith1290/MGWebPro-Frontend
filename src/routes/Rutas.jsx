import { Routes, Route } from 'react-router-dom';
import Login from '../pages/Login';
import Registro from '../pages/Registro';
import Informacion from '../pages/Informacion';
import PaginaInicio from '../pages/Inicio';
import Admi from '../pages/Admi';
import Carrito from '../pages/Carrito';
import Valoracion from '../pages/Valoracion';
import Histo from '../pages/Histo';
import PrivateRoutes from './PrivateRoutes';
import Confirma from '../pages/Confirma';

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
      <Route path=':producto_id/Resena' element={<Valoracion />} />
      <Route path='/historial' element={<Histo />} />
    </Routes>
  );
}

export default Rutas;
