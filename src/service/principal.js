// Función para obtener los datos del usuario autenticado
export const fetchUsuario = async () => {
    try {
        const response = await fetch('http://localhost:8000/api/users/my_details/', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
            credentials: 'include',
        });

        if (response.ok) {
            const data = await response.json();
            return data;
        } else {
            console.error('Error al obtener el usuario:', response.status);
            return null;
        }
    } catch (error) {
        console.error('Error al obtener el usuario:', error);
        return null;
    }
};
