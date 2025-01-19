import React, { forwardRef, useEffect, useState } from 'react';
import { Container, Row, Col, Card, Spinner } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import placeholderImage from '../../assets/images/Placeholder-Image.jpg';
import './Products.scss';


const ProductsCategories = () => {
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(true); // State for loading
    const navigate = useNavigate();

    // Fetching categories from Strapi
    useEffect(() => {
        const fetchCategories = async () => {
            setLoading(true); // Set loading to true when fetching starts
            try {
                // const response = await fetch('http://localhost:1337/api/product-categories?populate=*', {
                // const response = await fetch('http://192.168.1.34:1337/api/product-categories?populate=*', {
                const response = await fetch('http://192.168.174.231:1337/api/product-categories?populate=*', {
                    method: 'GET',
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json',
                    },
                    cache: 'no-cache',
                });

                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }

                const data = await response.json();
                // console.log(data);
                // Used to check data

                setCategories(data.data || []); // Ensure categories is set to an empty array if no data
            } catch (error) {
                console.error('Error fetching product categories:', error);
            } finally {
                setLoading(false); // Set loading to false after the fetch is complete
            }
        };

        fetchCategories();
    }, []);

    const handleCategoryClick = (categoryId) => {
        navigate(`/productCategory/${categoryId}`); // Navigate to ProductCategoryPage with categoryId
    };

    // Product Category Card Function
    return (
        <div className='p-3 mb-5 mt-5'>
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
                                                {category?.Image ? (
                                                    <Card.Img
                                                        // src={`http://localhost:1337${category.Image.url}`}
                                                        // src={`http://192.168.1.34:1337${category.Image.url}`}
                                                        src={`http://192.168.174.231:1337${category.Image.url}`}
                                                        className="card-img"
                                                    />
                                                ) : (
                                                    <Card.Img
                                                        src={placeholderImage}
                                                        alt="Product Category Image"
                                                        className="card-img"
                                                    />
                                                )}
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
}

export default forwardRef(ProductsCategories);
