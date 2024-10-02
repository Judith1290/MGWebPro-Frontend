import { Routes, Route } from 'react-router-dom';
import Login from "../pages/Login"
import Registro from '../pages/Registro';
import Inicio from '../pages/Inicio';
import Informacion from '../pages/Informacion';



function Rutas() {
    return (



        <Routes>
            <Route path='/' element={< Inicio />} />
            <Route path='/Login' element={< Login />} />
            <Route path='/Register' element={< Registro />} />
            <Route path='/Informacion' element={< Informacion />} />
            


        </Routes>



    );
}
export default Rutas;
