import React, { forwardRef, useState, useEffect } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import './About.scss';
import placeholderImage from './about-bg-image.png';

function About(props, ref) {
    const [image, setImage] = useState('');
    const [about, setAbout] = useState(''); // State to store the content
    const [loading, setLoading] = useState(true); // Loading state

    // Base URL for API
    const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

    useEffect(() => {
        fetch(`${API_BASE_URL}/api/about`)
            .then((response) => response.json())
            .then((data) => {
                // Assuming the 'About' content and image URL are in data.data
                const aboutContent = data.data?.About || 'Default about content if nothing is posted in Strapi.';
                const relativeImageUrl = data.data?.image?.url;
                const imageUrl = relativeImageUrl ? `${API_BASE_URL}${relativeImageUrl}` : placeholderImage;

                setImage(imageUrl);
                setAbout(aboutContent);
                setLoading(false);
            })
            .catch((error) => {
                console.error("Error fetching about us data:", error);
                setAbout('Default about content if nothing is posted in Strapi.');
                setImage(placeholderImage);
                setLoading(false);
            });
    }, [API_BASE_URL]);

    if (loading) {
        return <p>Loading...</p>;
    }

    return (
        <div className="about-section p-4" style={{ backgroundImage: `url(${image})` }}>
            <Container className="p-4">
                <Row className="justify-content-end">
                    <Col xs={12} md={6} lg={5} className="content-section p-0">
                        <h2 className="heading">My Story</h2>
                        <p className="para">
                            {about}
                        </p>
                    </Col>
                </Row>
            </Container>
        </div>
    );
}

export default forwardRef(About);
