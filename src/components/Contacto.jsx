import React, { useState } from 'react';
import emailjs from 'emailjs-com';



const Contacto = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    numero_phone: '',
    message: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const templateParams = {
      from_name: formData.name,
      from_email: formData.email,
      numero_phone: formData.numero_phone,
      message: formData.message,
    };

    emailjs.send('your_service_id', 'your_template_id', templateParams, 'your_user_id')
      .then((response) => {
        console.log('Correo enviado!', response.status, response.text);
      })
      .catch((error) => {
        console.error('Error al enviar el correo:', error);
      });
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Nombre:
        <input type="text" name="name" value={formData.name} onChange={handleChange} required />
      </label>
      <br />
      <label>
        Email:
        <input type="email" name="email" value={formData.email} onChange={handleChange} required />
      </label>
      <br />
      <label>
        Teléfono:
        <input type="text" name="phone" value={formData.phone} onChange={handleChange} required />
      </label>
      <br />
      <label>
        Mensaje:
        <textarea name="message" value={formData.message} onChange={handleChange} required />
      </label>
      <br />
      <button type="submit">Enviar</button>
    </form>
  );
};

export default Contacto;