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


    // Fetch all categories and filter for the selected category based on the ID
    useEffect(() => {
        const fetchCategoryAndProducts = async () => {
            try {
                // const response = await fetch(`http://localhost:1337/api/product-categories?populate[products][populate]=*`, {
                // const response = await fetch(`http://192.168.1.34:1337/api/product-categories?populate[products][populate]=*`, {
                const response = await fetch(`http://192.168.174.231:1337/api/product-categories?populate[products][populate]=*`, {
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
                // console.log('Fetched Category Data:', data); 
                // Debugging log

                // Finding the specific category by ID, we make sure to pasrse the id always
                const fetchedCategory = data.data.find(category => category.id === Number(id));

                if (fetchedCategory) {
                    setCategory(fetchedCategory);
                    setProducts(fetchedCategory.products || []); // Set products from fetched category
                    // console.log('Fetched Products: ', fetchedCategory.products);
                }

            } catch (error) {
                console.error('Error fetching category and products', error);
            }
        };

        fetchCategoryAndProducts();
    }, [id]);

    const handleProductClick = (productId) => {
        navigate(`/products/${productId}`);
    };

    // Product Category Page Card Function
    return (
        <div className="Products my-5">
            {category && (
                <div className='category-heading mb-5'>
                    <h2 className="d-flex justify-content-center category-name mb-2">{category?.Name || 'Category Name'}</h2>
                    <p className="d-flex justify-content-center category-description">{category?.Description || 'No description available'}</p>
                </div>
            )}

            <Container>
                <Row xs={1} sm={2} md={3} lg={4} className="g-4 d-flex justify-content-center">
                    {products.length > 0 ? (
                        products.map((product) => {
                            const relativePhotoUrl = product.Images?.[0]?.url;
                            // const photoUrl = relativePhotoUrl ? `http://localhost:1337${relativePhotoUrl}` : placeholderImage;
                            // const photoUrl = relativePhotoUrl ? `http://192.168.1.34:1337${relativePhotoUrl}` : placeholderImage;
                            const photoUrl = relativePhotoUrl ? `http://192.168.174.231:1337${relativePhotoUrl}` : placeholderImage;

                            return (
                                <Col key={product.id}>
                                    <Card className="product-card" onClick={() => handleProductClick(product.id)}>
                                        <div style={{ overflow: 'hidden' }}>
                                            <Card.Img
                                                className="card-img"
                                                src={photoUrl}
                                                alt={product.attributes?.Name || 'Product Image'}
                                            />
                                        </div>
                                        <Card.Body>
                                            <Card.Title className='card-product-name'>{product.Name || 'Product Name'}</Card.Title>
                                            <Card.Text className='card-product-price'>₹{product.Price || 'N/A'}/-</Card.Text>
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
}

export default ProductCategoryPage;
