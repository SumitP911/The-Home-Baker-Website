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

    // Base URL for API
    const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

    useEffect(() => {
        const fetchHomeData = async () => {
            setLoading(true);
            try {
                const response = await fetch(`${API_BASE_URL}/api/home`); // Fetch home data
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                const data = await response.json();

                // Use the same method to access the description as in your original code
                const homeContent = data.data?.Description || 'Default quote here';

                // Check if image data exists and extract it
                const homeImage = data.data?.Image?.url || '';

                setHome(homeContent);
                setImage(homeImage);
            } catch (error) {
                console.error("Error fetching home data:", error);
                setHome('Default quote here');
                setImage(''); // Reset image on error
            } finally {
                setLoading(false);
            }
        };

        fetchHomeData();
    }, [API_BASE_URL]);

    const getImageUrl = (img) => {
        // If an image URL exists, prepend the API base URL if it's a relative path
        if (img) {
            return img.startsWith('http') ? img : `${API_BASE_URL}${img}`;
        }
        return placeholderImage; // Default to placeholder
    };

    return (
        <Container fluid className="main-container d-flex flex-column justify-content-center">
            {/* Background vector */}
            <img className="vector-img" src={Vector} alt="Background Vector" />

            <Row className="d-flex align-items-center justify-content-center w-100">
                {/* Cake Image */}
                <Col xs={12} md={12} lg={6} className="left-container d-flex justify-content-center">
                    <img
                        className="Cake-Image"
                        src={getImageUrl(image)}
                        alt="Cake"
                    />
                </Col>

                {/* Content */}
                <Col xs={12} md={12} lg={6} className="right-container d-flex flex-column">
                    <div className="heading d-flex align-items-center mb-4">
                        <img className="hat-img me-3" src={ChefHat} alt="Chef Hat" />
                        <h1 className="text m-0">The Homebaker</h1>
                    </div>
                    <div className="home-section">
                        {loading ? (
                            <p className="cake-detail">Loading...</p>
                        ) : (
                            <p className="cake-detail">{home}</p>
                        )}
                    </div>
                </Col>
            </Row>
        </Container>
    );
}

export default forwardRef(Home);
