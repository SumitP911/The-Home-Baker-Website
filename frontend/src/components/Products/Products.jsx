import React, { forwardRef, useEffect, useState } from 'react';
import { Container, Row, Col, Card } from 'react-bootstrap';
import './Products.scss';
// import yourImage from '';

function Products() {
    return (
        <div className='ProductCategories'>
            <h2 className="d-flex justify-content-center">Product Categories</h2>
            <Container className="d-flex justify-content-center my-5">
                <Row xs={2} sm={2} md={2} lg={4} className="g-4">
                    {Array.from({ length: 8 }).map((_, idx) => (
                        <Col key={idx}>
                            <Card>
                                <Card.Img variant="top " src="https://cdn.uengage.io/uploads/7175/image-8LDDGZ-1706080808.jpg" />
                                <Card.Body>
                                    <Card.Title>Card title</Card.Title>
                                    <Card.Text>
                                        This is a longer card with supporting text below as a natural
                                        lead-in to additional content. This content is a little bit
                                        longer.
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

export default forwardRef(Products);

