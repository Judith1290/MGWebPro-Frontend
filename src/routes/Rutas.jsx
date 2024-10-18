
import { Routes, Route } from 'react-router-dom';
import Login from "../pages/Login";
import Registro from '../pages/Registro';
import Informacion from '../pages/Informacion';
import PaginaInicio from '../pages/Inicio';
import Admi from '../pages/Admi';
import { ProductProvider } from '../components/ProductContext';  
import Carrito from '../pages/carrito';

function Rutas() {
    return (
        <ProductProvider>
            <Routes>
                <Route path='/' element={<PaginaInicio />} />
                <Route path='/Login' element={<Login />} />
                <Route path='/Register' element={<Registro />} />
                <Route path='/Informacion' element={<Informacion />} />
                <Route path='/Administrador' element={<Admi />} />
                <Route path='/carrito' element={<Carrito />} />
            </Routes>
        </ProductProvider>
    );
}

export default Rutas;

