import React from 'react';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';

const Navigation = () => {
  const navigate = useNavigate();

  const logout = () => {
    localStorage.clear();
    Swal.fire('Success', 'Logout success', 'info');
    navigate('/login');
  };

  const token = localStorage.getItem('token');
  return (
    <div>
      <Navbar bg="light" expand="lg">
        <Navbar.Brand href="/">Inventory Nutech</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link href="/">My Product</Nav.Link>
          </Nav>

          {token ? (
            <button className="btn btn-danger" onClick={() => logout()}>
              logout
            </button>
          ) : (
            <Nav className="ms-ended">
              <Nav.Link href="/login">Login</Nav.Link>
            </Nav>
          )}
        </Navbar.Collapse>
      </Navbar>
    </div>
  );
};

export default Navigation;
