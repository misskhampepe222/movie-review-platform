import React from 'react';
import { Navbar, Nav, Container } from 'react-bootstrap';
import { Link } from 'react-router-dom';

function Navigation() {
  const navLinkStyle = {
    color: 'rgba(255, 255, 255, 0.55)',
    textDecoration: 'none',
    padding: '0.5rem 1rem',
    display: 'block'
  };

  const activeNavLinkStyle = {
    color: 'white',
    textDecoration: 'none',
    padding: '0.5rem 1rem',
    display: 'block'
  };

  return (
    <Navbar bg="dark" variant="dark" expand="lg">
      <Container>
        <Navbar.Brand as={Link} to="/">MovieReview</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Item>
              <Link to="/" style={navLinkStyle} className="nav-link-custom">Home</Link>
            </Nav.Item>
            <Nav.Item>
              <Link to="/search" style={navLinkStyle} className="nav-link-custom">Search Movies</Link>
            </Nav.Item>
            <Nav.Item>
              <Link to="/reviews" style={navLinkStyle} className="nav-link-custom">All Reviews</Link>
            </Nav.Item>
            <Nav.Item>
              <Link to="/create-review" style={navLinkStyle} className="nav-link-custom">Write Review</Link>
            </Nav.Item>
            <Nav.Item>
              <Link to="/my-reviews" style={navLinkStyle} className="nav-link-custom">My Reviews</Link>
            </Nav.Item>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Navigation;