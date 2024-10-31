import React, { useState } from 'react';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { Link, useNavigate } from 'react-router-dom';
import { FaShoppingCart, FaHistory } from 'react-icons/fa';
import Swal from 'sweetalert2';
import { logout } from '../service/registe'


function NavBar({ onSearch }) {
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();
    onSearch(searchTerm);
  };

  const handleLogout = async () => {
    const result = await logout();

    if (result) {
      Swal.fire({
        icon: 'success',
        title: 'Logout exitoso',
        text: 'Has cerrado sesión correctamente',
      });
      setTimeout(() => {
        navigate('/');
      }, 1000);
    } else {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Error al intentar cerrar sesión',
      });
    }
  };


  return (
  <Navbar expand="lg" className="header sticky-top">
    <Container fluid>
      <div className="tituloMG">
        <Navbar.Brand href="#">MG TECHNOLOGY</Navbar.Brand>
      </div>

      <Navbar.Toggle aria-controls="navbarScroll" />
      <Navbar.Collapse id="navbarScroll">
        <Nav className="me-auto my-2 my-lg-0" navbarScroll>
          <NavDropdown title="Contacto" id="navbarScrollingDropdown">
            <NavDropdown.Item as={Link} to="/Informacion">CONTACTO</NavDropdown.Item>
            <NavDropdown.Divider />
          </NavDropdown>

          <Nav.Link as={Link} to="/carrito">
            <FaShoppingCart size={20} />
          </Nav.Link>
          <Nav.Link as={Link} to="/historial">
            <FaHistory size={20} />
          </Nav.Link>
        </Nav>

        <Form className="d-flex mx-auto" onSubmit={handleSearch}>
          <Form.Control
            type="search"
            placeholder="Buscar productos"
            className="me-2 search-bar"
            aria-label="Search"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <button className="search-button btn btn-primary" type="submit">Buscar</button>
        </Form>

      
        <Nav className="ms-auto d-flex align-items-center">
          <Link to='/Login'>
            <button className="search-button btn btn-primary mx-2">REGISTRO</button>
          </Link>

          <button className="search-button btn btn-primary mx-2" onClick={handleLogout}>
            Cerrar Sesión
          </button>
        </Nav>
      </Navbar.Collapse>
    </Container>
  </Navbar>
);
};

export default NavBar;






