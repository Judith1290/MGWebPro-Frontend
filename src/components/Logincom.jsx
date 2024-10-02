import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import Swal from 'sweetalert2';

const Logincom = () => {
    const [contrasena, setContrasena] = useState('');
    const [correo, setCorreo] = useState('');
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();

        // Validar el correo electrónico
        if (!correo.includes('@')) {
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: "Correo electrónico inválido, por favor ingresar @!",
            });
            return;
        }

        try {
            // Enviar la solicitud POST al backend de Django
            const response = await fetch('http://localhost:8000/api/user/login/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                credentials: "include",
                body: JSON.stringify({
                    email: correo,
                    password: contrasena,
                }),
               });

            // Si el login es exitoso
            if (response.ok) {

                // Mostrar mensaje de éxito con SweetAlert2
                Swal.fire({
                    icon: "success",
                    title: "Login exitoso",
                    text: "Has iniciado sesión correctamente",
                });

            } else {
                // Si hay algún error en la respuesta (ej: credenciales incorrectas)
                const errorData = await response.json();
                Swal.fire({
                    icon: "error",
                    title: "Oops...",
                    text: errorData.error || "Error al intentar iniciar sesión",
                });
            }

        } catch (error) {
            // Capturar cualquier error al intentar conectar con el backend
            console.error("Error al intentar iniciar sesión:", error);
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: "Error al intentar iniciar sesión!",
            });
        }
    };


    return (
        <div className="container">
            <div className="card">
                <h2 className="title">Iniciar Sesión</h2>
                <p className="subtitle">¿No tienes una cuenta? <Link to="/Register" className="link">Regístrate</Link></p>
                <form onSubmit={handleLogin}>
                    <div className="mb-4">
                        <label htmlFor="correo" className="block text-sm font-medium">Correo Electrónico</label>
                        <input
                            type="text"
                            id="correo"
                            className="input"
                            placeholder="tucorreo@example.com"
                            value={correo}
                            onChange={(e) => setCorreo(e.target.value)}
                        />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="contrasena" className="block text-sm font-medium">Contraseña</label>
                        <input
                            type="password"
                            id="contrasena"
                            className="input"
                            placeholder="Ingrese 6 caracteres o más"
                            value={contrasena}
                            onChange={(e) => setContrasena(e.target.value)}
                        />
                    </div>
                    <button type="submit" className="button">Inicio</button>
                </form>
            </div>
        </div>
    );
};

export default Logincom;
