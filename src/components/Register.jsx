import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import 'bootstrap/dist/css/bootstrap.min.css';
import { registerUser } from '../service/registe';

const Register = () => {
    const [Nombre, setNombre] = useState('');
    const [Apellido, setApellido] = useState('');
    const [contraseña, setContraseña] = useState('');
    const [correo, setCorreo] = useState('');
    const navigate = useNavigate();

    const boton = async (e) => {
        e.preventDefault();

        if (!Nombre.trim() || !Apellido.trim() || !contraseña.trim() || !correo.trim()) {
            Swal.fire("Por favor, complete todos los campos!");
            return;
        }

        if (!correo.includes('@')) {
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: "Correo electrónico inválido, por favor ingresar @!",
            });
            return;
        }

        const payload = {
            first_name: Nombre,
            last_name: Apellido,
            email: correo,
            password: contraseña,
        };

        const response = await registerUser(payload); 

        if (response) {
            Swal.fire({
                position: "top-end",
                icon: "success",
                title: "Registro exitoso",
                showConfirmButton: false,
                timer: 1500,
            });
            navigate('/Login');
        } else {
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: "Usuario ya existente!",
            });
        }
    };

    return (
        <div className='d-flex justify-content-center align-items-center vh-100'>
            <div className="card p-4 shadow-sm" style={{ width: '100%', maxWidth: '400px', borderRadius: '15px' }}>
                <h1 className="text-center mb-4">REGISTRO</h1>

                <form onSubmit={boton}> 
                    <div className="mb-3">
                        <label htmlFor="nombre" className="form-label">Nombre</label>
                        <input
                            type="text"
                            className="form-control input-neon"
                            id="nombre"
                            placeholder="Nombre de usuario"
                            value={Nombre}
                            onChange={(e) => setNombre(e.target.value)}
                        />
                    </div>

                    <div className="mb-3">
                        <label htmlFor="apellido" className="form-label">Apellido</label>
                        <input
                            type="text"
                            className="form-control input-neon"
                            id="apellido"
                            placeholder="Apellido de usuario"
                            value={Apellido}
                            onChange={(e) => setApellido(e.target.value)}
                        />
                    </div>

                    <div className="mb-3">
                        <label htmlFor="contrasena" className="form-label">Contraseña</label>
                        <input
                            type="password"
                            className="form-control input-neon"
                            id="contrasena"
                            placeholder="Ingrese su contraseña"
                            value={contraseña}
                            onChange={(e) => setContraseña(e.target.value)}
                        />
                    </div>

                    <div className="mb-3">
                        <label htmlFor="correo" className="form-label">Correo Electrónico</label>
                        <input
                            type="email"
                            className="form-control input-neon"
                            id="correo"
                            placeholder="Correo electrónico"
                            value={correo}
                            onChange={(e) => setCorreo(e.target.value)}
                        />
                    </div>

                    <button type="submit" className="btn btn-primary w-100">REGISTRAR</button>
                </form>
            </div>
        </div>
    );
};

export default Register;


