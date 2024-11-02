import React, { useState } from 'react';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { Link, useNavigate } from 'react-router-dom';
import { FaShoppingCart, FaHistory } from 'react-icons/fa';
import Swal from 'sweetalert2';
import { logout } from '../service/registe';
import { useAuthContext } from '../context/AuthContext';

function NavBar({ onSearch }) {
  const { permission, update, setUpdate } = useAuthContext();
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();
    onSearch(searchTerm);
  };

  const handleLogout = async () => {
    const result = await logout();
    sessionStorage.removeItem("permission")

    if (result) {
      Swal.fire({
        icon: 'success',
        title: 'Cierre de sesión exitoso',
        text: 'Has cerrado sesión correctamente',
      });

      // Actualiza el estado de `update`
      setUpdate(update + 1);
      setPermission(null);
    } else {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Error al intentar cerrar sesión',
      });
    }

    // Navegar a la página de login
    navigate("/Login");
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
            {/* Botón de registro */}
            <Link to='/Login'>
              <button className="search-button btn btn-primary mx-2">REGISTRO</button>
            </Link>

            {/* Botón de cerrar sesión */}
            <button className="search-button btn btn-primary mx-2" onClick={handleLogout}>
              Cerrar Sesión
            </button>

            {/* Mostrar el botón "Admi" solo si el rol es 1 o 2 */}
            {(permission == '1' || permission == '2') && (
              <Link to='/Administrador'>
                <button className="search-button btn btn-primary mx-2">Admi</button>
              </Link>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavBar;


