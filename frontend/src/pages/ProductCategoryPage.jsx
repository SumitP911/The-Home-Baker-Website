import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Container, Row, Col, Card } from 'react-bootstrap';
import placeholderImage from '../assets/images/Placeholder-Image.jpg';


const ProductCategoryPage = () => {
    const navigate = useNavigate();
    const { id } = useParams();
    const [products, setProducts] = useState([]);
    const [category, setCategory] = useState([]);

    // Using fetch API to fetch data from Strapi
    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await fetch(`http://localhost:1337/api/product-categories/${id}?populate=products,products.Photos`, {
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
                setCategory(data.data);
                setProducts(data.data.attributes?.products?.data || []);

            } catch (error) {
                console.error('Error fetching products', error);
            }
        };

        fetchProducts();
    }, [id]); // Refetch products when categoryId changes

    const handleProductClick = (productId) => {
        navigate(`/products/${productId}`);
    };

    // Product Category Page Card Function
    // const imageUrl = product.attributes.Photos.data[0].attributes.url;
    return (
        <div className="Products">
            {category && (
                <div>
                    <h2 className="d-flex justify-content-center">{category.attributes?.Name || 'Category Name'}</h2>
                    <p className="d-flex justify-content-center">{category.attributes?.Description || 'No description available'}</p>
                </div>
            )}

            <Container className="d-flex justify-content-center my-5">
                <Row xs={2} sm={2} md={2} lg={4} className="g-5 justify-content-center">
                    {products.map((product) => {
                        // Access the photo URL for each product
                        const relativePhotoUrl = product.attributes?.Photos?.data?.[0]?.attributes?.url;
                        const photoUrl = relativePhotoUrl ? `http://localhost:1337${relativePhotoUrl}` : null;

                        return (
                            <Col key={product.id}>
                                <Card onClick={() => handleProductClick(product.id)}>
                                    <div style={{ padding: '15px', overflow: 'hidden', borderRadius: '0.5rem' }}>
                                        {photoUrl ? (
                                            <Card.Img
                                                src={photoUrl}
                                                alt={product.attributes?.Name || 'Product Image'}
                                            />
                                        ) : (
                                            <Card.Img src={placeholderImage} alt="Cake Image" />
                                        )}
                                    </div>
                                    <Card.Body>
                                        <Card.Title>{product.attributes?.Name || 'Product Name'}</Card.Title>
                                        <Card.Text>
                                            {product.attributes?.Description || 'No description available'}
                                        </Card.Text>
                                        <Card.Text>
                                            ₹{product.attributes?.Price || 'N/A'}/-
                                        </Card.Text>
                                    </Card.Body>
                                </Card>
                            </Col>
                        );
                    })}
                </Row>
            </Container>
        </div>
    );
}

export default ProductCategoryPage;