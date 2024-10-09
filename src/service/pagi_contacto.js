const handleSubmit = (e) => {
    e.preventDefault();
  
    // Enviar datos al backend de Django
    fetch('http://localhost:8000/api/user/send_email/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name: formData.name,
        email: formData.email,
        numero_phone: formData.numero_phone,
        message: formData.message,
      }),
    })
      .then((response) => {
        if (response.ok) {
          alert('Correo enviado exitosamente!');
        } else {
          return response.json().then((data) => {
            throw new Error(data.error);
          });
        }
      })
      .catch((error) => {
        console.error('Error al enviar el correo:', error);
        alert('Hubo un error al enviar el correo.');
      });
  };