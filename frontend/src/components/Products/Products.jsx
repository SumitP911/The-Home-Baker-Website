import React, { forwardRef, useEffect, useState } from 'react';
import { Container, Row, Col, Card } from 'react-bootstrap';
import './Products.scss';

const ProductsCategories = () => {
    const [categories, setCategories] = useState([]);

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const response = await fetch('http://localhost:1337/api/product-categories?populate=*', {
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
                setCategories(data.data);
                // console.log(data.data);
            } catch (error) {
                console.error('Error fetching product categories', error);
            }
        };

        fetchCategories();
    }, []);

    return (
        <div className='ProductCategories'>
            <h2 className="d-flex justify-content-center">Product Categories</h2>
            <Container className="d-flex justify-content-center my-5">
                <Row xs={2} sm={2} md={2} lg={4} className="g-5 justify-content-center">
                    {categories.map((category) => (
                        <Col key={category.id}>
                            <Card>
                                <div style={{ padding: '15px', overflow: 'hidden', borderRadius: '0.5rem' }}>
                                    <Card.Img src={`http://localhost:1337${category.attributes.Image.data.attributes.url}`}
                                        alt={category.attributes.Image.data.attributes.alternativeText || "Brownies Thumbnail"}
                                    // style={{ padding: '10px' }}
                                    // className='p-3 rounded'
                                    />
                                </div>
                                <Card.Body>
                                    <Card.Title>{category.attributes.Name}</Card.Title>
                                    <Card.Text>
                                        {category.attributes.Description}
                                    </Card.Text>
                                </Card.Body>
                            </Card>
                        </Col>
                    ))}
                </Row>
            </Container>
        </div>
    );
}

export default forwardRef(ProductsCategories);
