import React, { useState } from 'react';
import emailjs from 'emailjs-com';
import Mapa from './maps';
import { FaFacebook, FaWhatsapp, FaInstagram } from 'react-icons/fa';
import '../App'




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
    <div className="container mt-5">
      <div className="row">

        <div className="col-md-6 d-flex flex-column align-items-center">

          <Mapa />
        </div>


        <div className="col-md-6">
          <form onSubmit={handleSubmit} className="p-4 rounded-4 contact-form">
            <div className="mb-3">
              <label className="form-label">Nombre:</label>
              <input type="text" className="form-control animacion" name="name" value={formData.name} onChange={handleChange} required />
            </div>
            <div className="mb-3">
              <label className="form-label">Email:</label>
              <input type="email" className="form-control animacion" name="email" value={formData.email} onChange={handleChange} required />
            </div>
            <div className="mb-3">
              <label className="form-label">Teléfono:</label>
              <input type="text" className="form-control animacion" name="numero_phone" value={formData.numero_phone} onChange={handleChange} required />
            </div>
            <div className="mb-3">
              <label className="form-label">Mensaje:</label>
              <textarea className="form-control animacion" name="message" value={formData.message} onChange={handleChange} required />
            </div>
            <button type="submit" className="btn btn-primary w-100">Enviar</button>
          </form>

          <div className="mb-4 align-items-center">

            <a href="https://facebook.com" className="mx-2"><FaFacebook size={30} color="#4267B2" /></a>
            <a href="https://wa.me" className="mx-2"><FaWhatsapp size={30} color="#25D366" /></a>
            <a href="https://instagram.com" className="mx-2"><FaInstagram size={30} color="#E1306C" /></a>
          </div>

        </div>
      </div>
    </div>
  );
};

export default Contacto;
