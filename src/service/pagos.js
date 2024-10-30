export const pagopos = async () => {
    try {
        const response = await fetch(`http://localhost:8000/api/payments/create_checkout_session/`, {
            method: 'POST',
            credentials: 'include',
        });
        const data = await response.json()
        window.location.replace(data)


        if (!response.ok) {
            throw new Error('Error de pago');
        }
    } catch (error) {
        console.error('Error toggling product active:', error);
        throw error;
    }
};
