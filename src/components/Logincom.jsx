import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import Swal from 'sweetalert2';
import { loginUser } from '../service/registe';
import { useAuthContext } from '../context/AuthContext';

const Logincom = () => {
    const { update, setUpdate } = useAuthContext()
    const [contrasena, setContrasena] = useState('');
    const [correo, setCorreo] = useState('');
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();

        if (!correo.includes('@')) {
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Correo electrónico inválido, por favor ingresar @!',
            });
            return;
        }

        try {
            const response = await loginUser(correo, contrasena);

            if (response.ok) {
                Swal.fire({
                    icon: 'success',
                    title: 'Login exitoso',
                    text: 'Has iniciado sesión correctamente',
                });
                setUpdate(update + 1)
                setTimeout(() => {
                    navigate('/');
                }, 1000);
            } else {
                const errorData = await response.json();
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: errorData.error || 'Error al intentar iniciar sesión',
                });
            }
        } catch (error) {
            console.error('Error al intentar iniciar sesión:', error);
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Error al intentar iniciar sesión!',
            });
        }
    };

    return (
        <div className="login-container">
            <div className="login-card">
                <h2>Iniciar Sesión</h2>
                <p>
                    ¿No tienes una cuenta? <Link to="/Register" className="link">Regístrate</Link>
                </p>
                <form onSubmit={handleLogin}>
                    <input
                        type="text"
                        placeholder="Correo Electrónico"
                        value={correo}
                        onChange={(e) => setCorreo(e.target.value)}
                    />
                    <input
                        type="password"
                        placeholder="Contraseña"
                        value={contrasena}
                        onChange={(e) => setContrasena(e.target.value)}
                    />
                    <button type="submit" className="search-button">Iniciar</button>
                </form>
            </div>
        </div>
    );
};

export default Logincom;