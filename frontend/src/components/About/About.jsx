import React, { forwardRef, useState, useEffect } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import './About.scss';
import placeholderImage from './about-bg-image.png';

function About(props, ref) {
    const [image, setImage] = useState('');
    const [about, setAbout] = useState(''); // State to store the content
    const [loading, setLoading] = useState(true); // Loading state

    useEffect(() => {
        // fetch("http://localhost:1337/api/about")
        // fetch("http://192.168.1.34:1337/api/about")
        fetch("http://192.168.174.231:1337/api/about")
            .then((response) => response.json())
            .then((data) => {
                // Assuming the 'About' content is in data.data.About
                const aboutContent = data.data.About || 'Default about content if nothing is posted in Strapi.';
                // const imageUrl = data.data.image?.url;
                const imageUrl = data.data.image?.url || placeholderImage;
                setImage(imageUrl);
                setAbout(aboutContent);
                setLoading(false);
            })
            .catch((error) => {
                console.error("Error fetching about us data:", error);
                setAbout('Default about content if nothing is posted in Strapi.');
                // setImage(placeholderImage);
                setLoading(false);
            });
    }, []);

    return (
        <div className="about-section p-4" style={{ backgroundImage: `url(${image})` }}>
            <Container className='p-4'>
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
    )
}

export default forwardRef(About);
