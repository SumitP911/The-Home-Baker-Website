import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Container, Row, Col, Carousel, Button } from 'react-bootstrap';
import placeholderImage from '../assets/images/Placeholder-Image-1.jpeg';


const ProductPage = () => {
    const { id } = useParams();
    const [product, setProduct] = useState();
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchProductData = async () => {
            try {
                const response = await fetch(
                    `http://localhost:1337/api/products/${id}?populate=*`,
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
                    throw new Error(`Failed to fetch product data, status: ${response.status}`);
                }

                const data = await response.json();
                // console.log('Raw JSON Response:', data);

                // Check for existence of data.data right after fetching
                if (!data || !data.data) {
                    throw new Error('Product not found');
                }

                // Set product only if data.data is defined
                setProduct(data.data);

                console.log('Fetched product data:', data);

            } catch (error) {
                console.error('Error fetching product:', error.message || error);
            } finally {
                setLoading(false);
            }
        };

        fetchProductData();
    }, [id]);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (!product) {
        return <div>Product not found</div>;
    }

    return (
        <Container className="my-5">
            {/* Desktop Layout */}
            <Row className="d-none d-lg-flex">
                <Col lg={6}>
                    <ProductCarousel images={product?.attributes?.photos?.data} />
                </Col>
                <Col lg={6}>
                    <ProductDetails product={product} />
                </Col>
            </Row>

            {/* Mobile Layout */}
            <Row className="d-lg-none">
                <Col xs={12}>
                    <ProductCarousel images={product?.attributes?.photos?.data} />
                </Col>
                <Col xs={12} className="mt-3">
                    <ProductDetails product={product} />
                </Col>
            </Row>
        </Container>
    );
};

// Carousel Component to display product images
const ProductCarousel = ({ images }) => {

    return (
        <Carousel>
            {images && images.length > 0 ? (
                images.map((image, index) => (
                    <Carousel.Item key={index}>
                        <img
                            className="d-block w-100"
                            src={`http://localhost:1337${Photos?.data?.attributes?.url}`}
                            alt={image.attributes.name || `Slide ${index + 1}`}
                        />
                    </Carousel.Item>
                ))
            ) : (
                // Fallback Carousel item with placeholder image
                <Carousel.Item>
                    <img
                        className="d-block w-100"
                        src={placeholderImage}
                        alt="Placeholder Image"
                    />
                </Carousel.Item>
            )}
        </Carousel>
    );
};


// Component for product details and ordering
const ProductDetails = ({ product }) => (
    <div>
        <h2>{product?.attributes?.Name || 'Product Name'}</h2>
        <p>{product?.attributes?.Description || 'No description available.'}</p>

        <div>
            <h5>Quantity</h5>
            <p>{product?.attributes?.QuantityType || 'N/A'}</p>
        </div>

        <div>
            <h5>Category</h5>
            <p>{product?.attributes?.product_category?.data?.attributes?.Name || 'No category'}</p>
        </div>

        <Button variant="primary" className="mt-3">Place Order</Button>
    </div>
);


export default ProductPage;
