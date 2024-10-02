import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import 'bootstrap/dist/css/bootstrap.min.css';
import { postData } from '../service/api';

const Register = () => {
    const [Nombre, setNombre] = useState('');
    const [Apellido, setApellido] = useState('');
    const [contraseña, setContraseña] = useState('');
    const [correo, setCorreo] = useState('');
    const navigate = useNavigate();

    const boton = async () => {
        // Validación de campos
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

        // Lógica de registro
        try {
            const payload = {
                first_name: Nombre,
                last_name: Apellido,
                email: correo,
                password: contraseña,
            };

            const response = await postData('http://localhost:8000/api/user/register/', payload);

            if (response) {
                Swal.fire({
                    position: "top-end",
                    icon: "success",
                    title: "Registro exitoso",
                    showConfirmButton: false,
                    timer: 1500
                });
                navigate('/Login');
            } else {
                Swal.fire({
                    icon: "error",
                    title: "Oops...",
                    text: "Usuario ya existente!",
                });
            }
        } catch (error) {
            console.error('Error al enviar datos:', error);
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: "Registro fallido!",
            });
        }
    };

    return (
        <div className='container mt-5 d-flex justify-content-center ' style={{ border: "none" }}>
            <div className="card shadow border-0">
                <div className="card-body">
                    <h1 className="card-title text-center">REGISTRO</h1>

                    <div className="mb-4">
                        <label htmlFor="nombre" className="form-label">Nombre</label>
                        <input
                            type="text"
                            className="form-control custom-input"
                            id="nombre"
                            placeholder='Nombre de usuario'
                            value={Nombre}
                            onChange={(e) => setNombre(e.target.value)}
                        />
                    </div>

                    <div className="mb-4">
                        <label htmlFor="apellido" className="form-label">Apellido</label>
                        <input
                            type="text"
                            className="form-control custom-input"
                            id="apellido"
                            placeholder='Apellido de usuario'
                            value={Apellido}
                            onChange={(e) => setApellido(e.target.value)}
                        />
                    </div>

                    <div className="mb-4">
                        <label htmlFor="contraseña" className="form-label">Contraseña</label>
                        <input
                            type='password'
                            className="form-control custom-input"
                            id='contraseña'
                            placeholder='Password'
                            value={contraseña}
                            onChange={(e) => setContraseña(e.target.value)}
                        />
                    </div>

                    <div className="mb-4">
                        <label htmlFor="correo" className="form-label">Correo Electrónico</label>
                        <input
                            type='email'
                            className="form-control custom-input"
                            id='correo'
                            placeholder='Gmail'
                            value={correo}
                            onChange={(e) => setCorreo(e.target.value)}
                        />
                    </div>

                    <button onClick={boton} className="btn btn-primary w-100 custom-button">REGISTRAR</button>
                </div>
            </div>
        </div>
    );
};

export default Register;

