import React, { useState } from 'react';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { Link } from 'react-router-dom';
import { FaShoppingCart, FaHistory } from 'react-icons/fa';

function NavBar({ onSearch }) {
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearch = (e) => {
    e.preventDefault();
    onSearch(searchTerm);
  };

  return (
    <Navbar expand="lg" className='header'>
      <Container fluid>


        <div className='tituloMG'><Navbar.Brand href="#">MG TECHNOLOGY</Navbar.Brand></div>

        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll">
          <Nav className="me-auto my-2 my-lg-0" navbarScroll>
            <NavDropdown title="Contacto" id="navbarScrollingDropdown">
              <NavDropdown.Item as={Link} to="/Informacion">CONTACTO</NavDropdown.Item>
              <NavDropdown.Divider />
            </NavDropdown>
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
            <button className="search-button" type="submit">Buscar</button>  
          </Form>


          <Nav className="ml-auto d-flex align-items-center">
            <Nav.Link as={Link} to="/carrito">
              <FaShoppingCart size={20} />
            </Nav.Link>
            <Nav.Link as={Link} to="/historial"> 
              <FaHistory size={20} /> 
            </Nav.Link>
            <button className='botton' variant="outline-success">
              <Link to='/Login'>REGISTRO</Link>
            </button>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavBar;






