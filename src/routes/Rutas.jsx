import { Routes, Route } from 'react-router-dom';
import Login from "../pages/Login"
import Registro from '../pages/Registro';
import Informacion from '../pages/Informacion';
import PaginaInicio from '../pages/inicio';


function Rutas() {
    return (



        <Routes>
            <Route path='/' element={< PaginaInicio />} />
            <Route path='/Login' element={< Login />} />
            <Route path='/Register' element={< Registro />} />
            <Route path='/Informacion' element={< Informacion />} />
         
        </Routes>



    );
}
export default Rutas;
