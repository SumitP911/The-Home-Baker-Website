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
                            <button onClick={onHomeClick}>Home</button>
                            <button onClick={onProductsClick}>Products</button>
                            <button onClick={onTestimonialsClick}>Testimonials</button>
                            <button onClick={onAboutClick}>About</button>
                            <button onClick={onContactClick}>Contact</button>
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </>
    );
}

export default Navigation;

