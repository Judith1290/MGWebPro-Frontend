
const enviarCorreo = (formData) => {
  console.log("Datos que se envían al backend:", formData); 

  return fetch('http://localhost:8000/api/enviar-correo/', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      name: formData.name,
      email: formData.email,
      phone: formData.phone,
      message: formData.message,
    }),
  })
  .then((response) => response.json())
  .then((data) => {
    console.log("Respuesta del backend:", data);
    return data; 
  })
  .catch((error) => {
    console.error('Error al enviar el correo:', error);
    throw error; 
  });
};

export { enviarCorreo };




