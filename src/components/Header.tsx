import React, { useContext } from 'react';
import { Container, Navbar, Nav } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { DentistContext } from '../context/DentistContext';

const Header = () => {
  const { dentist } = useContext(DentistContext);
  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('dentist');
    navigate('/login');
  };

  return (
    <Navbar expand="sm" bg="dark" variant="dark" className="pt-2 pb-2">
      <Container>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link
                data-testid="customer_products__element-navbar-user-full-name"
              >
                { dentist.email }
              </Nav.Link>
          </Nav>
          <Nav>
            <Nav.Link
              data-testid="customer_products__element-navbar-link-logout"
              onClick={ logout }
            >
              Sair
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Header;