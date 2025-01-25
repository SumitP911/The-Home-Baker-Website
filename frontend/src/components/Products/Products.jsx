import React, { forwardRef, useEffect, useState } from 'react';
import { Container, Row, Col, Card, Spinner } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import placeholderImage from '../../assets/images/Placeholder-Image.jpg';
import './Products.scss';

const ProductsCategories = () => {
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

    useEffect(() => {
        const fetchCategories = async () => {
            setLoading(true);
            try {
                const response = await fetch(`${API_BASE_URL}/api/product-categories?populate=*`, {
                    method: 'GET',
                    headers: {
                        Accept: 'application/json',
                        'Content-Type': 'application/json',
                    },
                    cache: 'no-cache',
                });

                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }

                const data = await response.json();
                console.log('Fetched categories:', data); // Debugging log
                setCategories(data.data || []);
            } catch (error) {
                console.error('Error fetching product categories:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchCategories();
    }, [API_BASE_URL]);

    const handleCategoryClick = (categoryId) => {
        navigate(`/productCategory/${categoryId}`);
    };

    const getImageUrl = (imageObj) => {
        // Ensure the image object is valid
        if (!imageObj) return placeholderImage;

        // Use thumbnail URL if available, otherwise the main URL
        return imageObj.formats?.thumbnail?.url || imageObj.url || placeholderImage;
    };

    return (
        <div className="p-3 mb-5 mt-5">
            <h2 className="d-flex justify-content-center mb-5">PRODUCT CATEGORIES</h2>
            <Container className="d-flex justify-content-center px-0 my-0">
                {loading ? (
                    <Spinner animation="border" variant="primary" />
                ) : (
                    <Row xs={2} sm={2} md={4} lg={4} className="g-4 mx-0 justify-content-center">
                        {categories.length === 0 ? (
                            <Col>
                                <h4 className="text-center">No categories available</h4>
                            </Col>
                        ) : (
                            categories.map((category) => (
                                <Col key={category.id} className="d-flex">
                                    <Card
                                        className="product-category-card d-flex flex-column"
                                        onClick={() => handleCategoryClick(category.id)}
                                    >
                                        <Card.Body className="d-flex flex-column">
                                            <Card.Title>{category?.Name || 'Unnamed Category'}</Card.Title>
                                            <div style={{ overflow: 'hidden' }}>
                                                <Card.Img
                                                    src={getImageUrl(category?.Image)}
                                                    alt={category?.Name || 'Product Category'}
                                                    className="card-img"
                                                />
                                            </div>
                                        </Card.Body>
                                    </Card>
                                </Col>
                            ))
                        )}
                    </Row>
                )}
            </Container>
        </div>
    );
};

export default forwardRef(ProductsCategories);
