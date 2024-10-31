
export const registerUser = async (payload) => {
    try {
        const response = await fetch('http://localhost:8000/api/users/register/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(payload),
        });

        if (!response.ok) {
            throw new Error('Usuario ya existente');
        }

        return await response.json();
    } catch (error) {
        console.error('Error al registrar usuario:', error);
        return null;
    }
};




export const loginUser = async (correo, contrasena) => {
    const response = await fetch('http://localhost:8000/api/users/login/', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify({
            email: correo,
            password: contrasena,
        }),
    });

    return response;
};

export const logout = async () => {
    try {
        const response = await fetch('http://localhost:8000/api/users/logout/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            credentials: 'include',
        });

        if (response.ok) {
            const data = await response.json();
            return data;
        } else {
            console.error('Error al cerrar seccion:', response.status);
            return null;
        }
    } catch (error) {
        console.error('Error al cerrar seccion:', error);
        return null;
    }
};

