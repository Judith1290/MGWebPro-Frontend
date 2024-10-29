
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

        return await response.json(); // Asumiendo que la respuesta exitosa devuelve un objeto JSON
    } catch (error) {
        console.error('Error al registrar usuario:', error);
        return null;
    }
};
