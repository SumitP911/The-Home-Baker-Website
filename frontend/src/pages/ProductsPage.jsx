import React, { forwardRef, useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Card, Container, Row, Col, Carousel } from 'react-bootstrap';
import placeholderImage from '../assets/images/Placeholder-Image-1.jpeg';
import './ProductsPage.scss';


const ProductPage = () => {
    const { id } = useParams();
    const [product, setProduct] = useState();
    const [bestSellers, setBestSellers] = useState([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        // Fetching testimonials and best sellers data
        Promise.all([
            // fetch('http://192.168.1.34:1337/api/products?populate=*').then(res => res.json())
            fetch('http://192.168.174.231:1337/api/products?populate=*').then(res => res.json())
        ])
            .then(([productData]) => {
                const specificProduct = productData.data.find(item => item.id === parseInt(id));

                if (specificProduct) {
                    setProduct(specificProduct); // Set the selected product
                }

                const filteredBestSellers = productData.data.filter(product => product.BestSeller === true);
                setBestSellers(filteredBestSellers); // Set the best sellers

                setLoading(false); // Once data is fetched, set loading to false
            })
            .catch(error => {
                console.error('Error fetching data:', error);
                setLoading(false);
            });
    }, [id]);

    if (loading) return <div>Loading...</div>;
    if (!product) return <div>Product not found</div>;

    const handleProductClick = (productId) => {
        navigate(`/products/${productId}`);  // Navigate to the product page
    };

    return (
        <Container fluid className="main-container p-4 d-flex flex-column">
            {/* Product Showcase */}
            <div className="product-showcase mb-5 justify-content-center">
                <Row className='justify-content-center align-items-center'>
                    {/* Desktop Layout for Product Image */}
                    <Col lg={5} xs={12} className="product-image d-flex justify-content-center align-items-center">
                        <ProductCarousel images={product.Images} />
                    </Col>
                    {/* Desktop Layout for Product Details */}
                    <Col lg={5} xs={12} className="product-details d-flex align-items-center">
                        <ProductDetails product={product} />
                    </Col>
                </Row>
            </div>

            {/* Best Sellers Section */}
            <div className="best-seller mt-4 mb-4 justify-content-center">
                <h3 className="mb-5">Best Sellers</h3>
                {bestSellers.length > 0 ? (
                    <Row xs={1} md={2} lg={4} className="g-4 ">
                        {bestSellers.slice(0, 8).map(product => {
                            const relativePhotoUrl = product.Images?.[0]?.url;
                            // const photoUrl = relativePhotoUrl ? `http://192.168.1.34:1337${relativePhotoUrl}` : placeholderImage;
                            const photoUrl = relativePhotoUrl ? `http://192.168.174.231:1337${relativePhotoUrl}` : placeholderImage;

                            return (
                                <Col key={product.id} className="d-flex justify-content-center">
                                    <Card className="product-card shadow-sm text-center" onClick={() => handleProductClick(product.id)}>
                                        <div style={{ overflow: 'hidden' }}>
                                            <Card.Img
                                                className="card-img"
                                                src={photoUrl}
                                                alt={product.attributes?.Name || 'Product Image'}
                                            />
                                        </div>
                                        <Card.Body>
                                            <Card.Title className='card-product-name'>{product.Name}</Card.Title>
                                            <Card.Text className='card-product-price'>₹{product.Price}</Card.Text>
                                        </Card.Body>
                                    </Card>
                                </Col>
                            );
                        })}
                    </Row>
                ) : (
                    <Row className="justify-content-center mt-4">
                        <Col xs={12} className="text-center">
                            <p>No best sellers available.</p>
                        </Col>
                    </Row>
                )}
            </div>
        </Container>

    );
};

const ProductCarousel = ({ images }) => (
    <Carousel className="product-carousel">
        {images && images.length > 0 ? (
            images.map((image, index) => (
                <Carousel.Item key={index} className="carousel-item">
                    <img
                        className="d-block w-100 h-100"
                        // src={`http://192.168.1.34:1337${image.url}`}
                        src={`http://192.168.174.231:1337${image.url}`}
                        alt={image.name || 'Product Image'}
                    />
                </Carousel.Item>
            ))
        ) : (
            <Carousel.Item className="carousel-item">
                <img
                    className="d-block w-100 h-100"
                    src={placeholderImage}
                    alt="Placeholder Image"
                />
            </Carousel.Item>
        )}
    </Carousel>
);

const ProductDetails = ({ product }) => {
    const phoneNumber = '9637278473'; // Replace with the desired WhatsApp number
    const message = `Hello, I would like to place an order for:
    
*Product:* ${product.Name}
*Price:* ₹${product.Price}/-
*Quantity:*
    
Thank you!`;

    const handleOrderClick = () => {
        const url = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
        window.location.href = url;
    };

    return (
        <div>
            <h2 className='product-name mb-3'>{product.Name || 'Product Name'}</h2>
            <p className='product-description'>{product.Description || 'No description available.'}</p>


            <h4 className='product-price'>{product?.Price ? `₹${product.Price}/-` : 'N/A'}</h4>


            <div
                className="custom-button mt-3"
                onClick={handleOrderClick}
            >
                Place Order via Whatsapp
            </div>
        </div>
    );
};

export default forwardRef(ProductPage);
