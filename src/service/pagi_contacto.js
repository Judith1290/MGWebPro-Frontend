// const enviarCorreo = (e) => {
//   e.preventDefault(); // Previene que el formulario se envíe de forma predeterminada

//   console.log("Datos que se envían al backend:", formData); // Verifica que los datos sean correctos

//   fetch('http://localhost:8000/api/enviar-correo/', {
//     method: 'POST',
//     headers: {
//       'Content-Type': 'application/json',
//     },
//     body: JSON.stringify({
//       // name: formData.name,
//       // email: formData.email,
//       // phone: formData.phone,
//       // message: formData.message,
//     }),
//   })
//   .then((response) => {
//     console.log("Estado de la respuesta:", response.status); // Muestra el código de estado de la respuesta
//     return response.json().then((data) => {
//       console.log("Datos de la respuesta:", data); // Muestra la respuesta del servidor
//       if (response.ok) {
//         alert('Correo enviado exitosamente!');
//       } else {
//         throw new Error(data.error || "Error desconocido");
//       }
//     });
//   })
//   .catch((error) => {
//     console.error('Error al enviar el correo:', error.message || error); // Muestra el error en la consola
//     alert('Hubo un error al enviar el correo.');
//   });
// }

// export { enviarCorreo };

const enviarCorreo = (formData) => {
  console.log("Datos que se envían al backend:", formData); // Verifica que los datos sean correctos

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
    return data; // Retorna la respuesta para manejarla en el componente
  })
  .catch((error) => {
    console.error('Error al enviar el correo:', error);
    throw error; // Lanza el error para manejarlo en el componente
  });
};

export { enviarCorreo };




