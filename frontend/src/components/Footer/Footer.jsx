import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import logo from './logo-footer-main.jpeg';
import './Footer.scss';


function Footer() {
    return (
        <Container fluid className="border-top pt-3 m-0">
            <Row className="align-items-center justify-content-center text-center">
                {/* Left Section: Brand Info */}
                <div className="d-flex align-items-center justify-content-center text-center mb-4">
                    <img src={logo} alt="Brand Logo" className="brand-logo me-3" style={{ width: '50px', height: '50px' }} />
                    <div>
                        <h3 className="brand-name mb-0">The Homebaker</h3>
                        <p className="tagline mb-0">Cakes | Desserts | Brownies</p>
                    </div>
                </div>
                <div className="copyrights m-0">
                    <p>© 2025 All rights reserved</p>
                </div>
            </Row>
        </Container>
    );
}

export default Footer;
