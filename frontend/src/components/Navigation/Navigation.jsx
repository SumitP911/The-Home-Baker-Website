import React from 'react';
import { Link } from 'react-router-dom';
import { Container, Nav, Navbar } from 'react-bootstrap';

function Navigation({ onHomeClick, onProductsClick, onTestimonialsClick, onAboutClick, onContactClick }) {
    return (
        <>
            <Navbar expand="lg" className="bg-body-tertiary">
                <Container>
                    <Navbar.Brand href="#home">The Homebaker</Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="me-auto">
                            <li><Link onClick={onHomeClick}>Home</Link></li>
                            <li><Link onClick={onProductsClick}>Products</Link></li>
                            <li><Link onClick={onTestimonialsClick}>Testimonials</Link></li>
                            <li><Link onClick={onAboutClick}>About</Link></li>
                            <li><Link onClick={onContactClick}>Contact</Link></li>
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </>
    );
}

export default Navigation;

