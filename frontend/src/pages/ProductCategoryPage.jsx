import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Container, Row, Col, Card } from 'react-bootstrap';
import placeholderImage from '../assets/images/Placeholder-Image.jpg';

import './ProductCategoryPage.scss';

const ProductCategoryPage = () => {
    const navigate = useNavigate();
    const { id } = useParams();
    const [products, setProducts] = useState([]);
    const [category, setCategory] = useState(null);

    // Base URL for API
    const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

    // Fetch all categories and filter for the selected category based on the ID
    useEffect(() => {
        const fetchCategoryAndProducts = async () => {
            try {
                const response = await fetch(
                    `${API_BASE_URL}/api/product-categories?populate[products][populate]=*`,
                    {
                        method: 'GET',
                        headers: {
                            'Accept': 'application/json',
                            'Content-Type': 'application/json',
                        },
                        cache: 'no-cache',
                    }
                );

                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }

                const data = await response.json();

                // Find the specific category by ID
                const fetchedCategory = data.data.find((category) => category.id === Number(id));

                if (fetchedCategory) {
                    setCategory(fetchedCategory);
                    setProducts(fetchedCategory.products || []); // Set products from fetched category
                }
            } catch (error) {
                console.error('Error fetching category and products', error);
            }
        };

        fetchCategoryAndProducts();
    }, [API_BASE_URL, id]);

    const handleProductClick = (productId) => {
        navigate(`/products/${productId}`);
    };

    return (
        <div className="Products my-5">
            {category && (
                <div className="category-heading mb-5">
                    <h2 className="d-flex justify-content-center category-name mb-2">
                        {category?.Name || 'Category Name'}
                    </h2>
                    <p className="d-flex justify-content-center category-description">
                        {category?.Description || 'No description available'}
                    </p>
                </div>
            )}

            <Container>
                <Row xs={1} sm={2} md={3} lg={4} className="g-4 d-flex justify-content-center">
                    {products.length > 0 ? (
                        products.map((product) => {
                            const imageUrl =
                                product.Images?.[0]?.url ||
                                product.Images?.[0]?.formats?.thumbnail?.url ||
                                placeholderImage;

                            return (
                                <Col key={product.id}>
                                    <Card
                                        className="product-card"
                                        onClick={() => handleProductClick(product.id)}
                                    >
                                        <div style={{ overflow: 'hidden' }}>
                                            <Card.Img
                                                className="card-img"
                                                src={imageUrl.startsWith('http') ? imageUrl : `${API_BASE_URL}${imageUrl}`}
                                                alt={product.Name || 'Product Image'}
                                            />
                                        </div>
                                        <Card.Body>
                                            <Card.Title className="card-product-name">
                                                {product.Name || 'Product Name'}
                                            </Card.Title>
                                            <Card.Text className="card-product-price">
                                                ₹{product.Price || 'N/A'}/-
                                            </Card.Text>
                                        </Card.Body>
                                    </Card>
                                </Col>
                            );
                        })
                    ) : (
                        <Col>
                            <h4 className="text-center">No products available in this category</h4>
                        </Col>
                    )}
                </Row>
            </Container>
        </div>
    );
};

export default ProductCategoryPage;
