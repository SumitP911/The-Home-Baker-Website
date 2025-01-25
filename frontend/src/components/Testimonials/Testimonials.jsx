import React, { forwardRef, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Container, Row, Col, Card } from 'react-bootstrap';

// Import all the media
import placeholderImage from './Placeholder-Cake.png';
import bestSellersIcon from './best-sellers-icon.png';
import testimonialsIcon from './testimonials-icon.png';
import reviewIcon from './review-icon.png';
import leftArrowIcon from './arrow-left.png';
import rightArrowIcon from './arrow-right.png';

// Import the scss file
import './Testimonials.scss';

function Testimonials() {
    const [testimonials, setTestimonials] = useState([]);
    const [bestSellers, setBestSellers] = useState([]);
    const [currentPage, setCurrentPage] = useState(0); // Keeping track of the current group of testimonials
    const [loading, setLoading] = useState(true); // Loading state for testimonials and best sellers
    const navigate = useNavigate();

    // Base URL for API
    const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

    useEffect(() => {
        // Fetching testimonials and best sellers data
        Promise.all([
            fetch(`${API_BASE_URL}/api/testimonials`).then(res => res.json()),
            fetch(`${API_BASE_URL}/api/products?populate=*`).then(res => res.json()),
        ])
            .then(([testimonialData, productData]) => {
                setTestimonials(testimonialData.data || []);
                const filteredBestSellers = (productData.data || []).filter(product => product.BestSeller === true);
                setBestSellers(filteredBestSellers);
                setLoading(false);
            })
            .catch(error => {
                console.error('Error fetching data:', error);
                setLoading(false);
            });
    }, [API_BASE_URL]);

    const testimonialsPerPage = 3;
    const totalTestimonials = testimonials.length;

    // Get the current set of testimonials to display
    const currentTestimonials = testimonials.slice(
        currentPage * testimonialsPerPage,
        (currentPage + 1) * testimonialsPerPage
    );

    // Get the next set of testimonials to display
    const handleNext = () => {
        if ((currentPage + 1) * testimonialsPerPage < totalTestimonials) {
            setCurrentPage(prevPage => prevPage + 1);
        }
    };

    // Get the previous set of testimonials to display
    const handlePrevious = () => {
        if (currentPage > 0) {
            setCurrentPage(prevPage => prevPage - 1);
        }
    };

    // Navigate to the product page
    const handleProductClick = (productId) => {
        navigate(`/products/${productId}`);
    };

    if (loading) {
        return <p>Loading...</p>;
    }

    return (
        <Container fluid className="p-4">
            <Row className="g-4">
                {/* Best Sellers Section */}
                <Col md={6} className="mb-5">
                    <div className="best-sellers p-2 mb-4 d-flex align-items-center justify-content-center rounded">
                        <img
                            src={bestSellersIcon}
                            height="25"
                            width="25"
                            className="me-2"
                        />
                        <h3 className="mb-0">Best Sellers</h3>
                    </div>

                    {bestSellers.length > 0 ? (
                        <Row xs={1} md={1} lg={2} className="g-4 justify-content-center">
                            {bestSellers.slice(0, 4).map(product => {
                                const imageUrl =
                                    product.Images?.[0]?.url ||
                                    product.Images?.[0]?.formats?.thumbnail?.url ||
                                    placeholderImage;

                                return (
                                    <Col key={product.id} className="d-flex justify-content-center">
                                        <Card className="product-card shadow-sm text-center" onClick={() => handleProductClick(product.id)}>
                                            <div style={{ overflow: 'hidden' }}>
                                                <Card.Img
                                                    className="card-img"
                                                    src={imageUrl.startsWith('http') ? imageUrl : `${API_BASE_URL}${imageUrl}`}
                                                    alt={product.Name || 'Product Image'}
                                                />
                                            </div>
                                            <Card.Body>
                                                <Card.Title>{product.Name}</Card.Title>
                                                <Card.Text className="card-product-price fw-bold">₹{product.Price}</Card.Text>
                                            </Card.Body>
                                        </Card>
                                    </Col>
                                );
                            })}
                        </Row>
                    ) : (
                        <p>No best sellers available.</p>
                    )}
                </Col>

                {/* Testimonials Section */}
                <Col md={6} className="mb-5">
                    <div className="testimonials p-2 mb-3 d-flex align-items-center justify-content-center rounded">
                        <img
                            src={testimonialsIcon}
                            height="25"
                            width="25"
                            className="me-2"
                        />
                        <h3 className="mb-0">Testimonials</h3>
                    </div>
                    <div className="d-flex flex-column gap-4">
                        {currentTestimonials.map((testimonial, index) => (
                            <Card key={index} className="shadow-sm">
                                <Card.Body>
                                    <img
                                        src={reviewIcon}
                                        height="25"
                                        width="25"
                                        className="mb-2"
                                    />
                                    <Card.Title className="mb-2 text-start">{testimonial.Name}</Card.Title>
                                    <Card.Text>{testimonial.Review}</Card.Text>
                                </Card.Body>
                            </Card>
                        ))}
                    </div>

                    {/* Buttons for reviews */}
                    <div className="d-flex justify-content-center gap-2 mt-3">
                        <div
                            className="custom-button-img left-button"
                            onClick={handlePrevious}
                            style={{ cursor: 'pointer' }}
                            aria-label="Previous"
                        >
                            <img
                                src={leftArrowIcon}
                                alt="Previous"
                                className="img-fluid"
                            />
                        </div>
                        <div
                            className="custom-button-img right-button"
                            onClick={handleNext}
                            style={{ cursor: 'pointer' }}
                            aria-label="Next"
                        >
                            <img
                                src={rightArrowIcon}
                                alt="Next"
                                className="img-fluid"
                            />
                        </div>
                    </div>
                </Col>
            </Row>
        </Container>
    );
}

export default forwardRef(Testimonials);
