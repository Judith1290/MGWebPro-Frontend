export const pagopos = async (payload) => {
    try {
        const response = await fetch(`http://localhost:8000/api/payments/create_checkout_session/`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            credentials: 'include',
            body: JSON.stringify(payload)
        });
        const data = await response.json()
        return data



        if (!response.ok) {
            throw new Error('Error de pago');
        }
    } catch (error) {
        console.error('Error toggling product active:', error);
        throw error;
    }
};

export const historial = async () => {
    try {
        const response = await fetch(`http://localhost:8000/api/payments/my_payments/`, {
            method: 'GET',
            credentials: 'include',
        });
        const data = await response.json()

        if (!response.ok) {
            throw new Error('Error de historia');
        }

        return data;
    } catch (error) {
        console.error('Error toggling product active:', error);
        throw error;
    }
};





