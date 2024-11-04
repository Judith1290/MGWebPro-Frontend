import React, { useState } from 'react';
import Mapa from './Maps';
import { FaFacebook, FaWhatsapp, FaInstagram } from 'react-icons/fa';
import {enviarCorreo} from '../service/pagi_contacto'



const Contacto = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '', 
    message: ''
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    try {
      const data = await enviarCorreo(formData); // Llamar a enviarCorreo con formData
      if (data) {
        alert('Correo enviado exitosamente');
        setFormData(INITIAL_FORM_DATA); // Restablecer el formulario
      } else {
        alert('Hubo un error al enviar el correo');
      }
    } catch (error) {
      alert('Error al enviar el correo. Intenta nuevamente.');
    }
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
              <input type="text" className="form-control animacion" name="phone" value={formData.phone} onChange={handleChange} required />  {/* Cambié 'numero_phone' a 'phone' */}
            </div>
            <div className="mb-3">
              <label className="form-label">Mensaje:</label>
              <textarea className="form-control animacion" name="message" value={formData.message} onChange={handleChange} required />
            </div>
            <button type="submit" className="search-button w-100">Enviar</button>
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

