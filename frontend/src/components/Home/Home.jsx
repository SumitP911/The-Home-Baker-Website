import React, { forwardRef, useState, useEffect } from 'react';
import { Container, Row, Col } from "react-bootstrap";
import Vector from './Vector-2.png';
import ChefHat from './Chef-Hat.png';
import placeholderImage from './Placeholder-Cake-Image.png';

import './Home.scss';

function Home() {
    const [image, setImage] = useState('');
    const [home, setHome] = useState(''); // State to store the content
    const [loading, setLoading] = useState(true); // Loading state

    useEffect(() => {
        // fetch("http://localhost:1337/api/home")
        // fetch("http://192.168.1.34:1337/api/home")
        fetch("http://192.168.174.231:1337/api/home")
            .then((response) => response.json())
            .then((data) => {
                const homeContent = data.data.Description || 'Default quote here';
                // const imageUrl = data.data.image?.url || placeholderImage;
                // setImage(imageUrl);
                setHome(homeContent);
                setLoading(false);
            })
            .catch((error) => {
                console.error("Error fetching about us data:", error);
                setHome('Default quote here');
                // setImage(placeholderImage);
                setLoading(false);
            });
    }, []);

    return (
        <Container fluid className="main-container d-flex flex-column justify-content-center">
            {/* Background vector */}
            <img className="vector-img" src={Vector} alt="Background Vector" />

            <Row className="d-flex align-items-center justify-content-center w-100">
                {/* Cake Image */}
                <Col xs={12} md={12} lg={6} className="left-container d-flex justify-content-center">
                    <img className="Cake-Image" src={placeholderImage} alt="Cake" />
                </Col>

                {/* Content */}
                <Col xs={12} md={12} lg={6} className="right-container d-flex flex-column">
                    <div className="heading d-flex align-items-center mb-4">
                        <img className="hat-img me-3" src={ChefHat} alt="Chef Hat" />
                        <h1 className="text m-0">The Homebaker</h1>
                    </div>
                    <div className="home-section">
                        <p className="cake-detail">
                            {home}
                        </p>
                    </div>
                </Col>
            </Row>
        </Container>

    );
}

export default forwardRef(Home);