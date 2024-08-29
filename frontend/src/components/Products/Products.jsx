import React, { forwardRef } from 'react'
import { Container, Row, Col, Card } from 'react-bootstrap';
import './Products.scss';

function Products() {
    return (
        <>
            <h2 className="d-flex justify-content-center">Product Categories</h2>
            <Container className="d-flex justify-content-center">
                <Row xs={1} sm={2} md={2} lg={4} className="g-4">
                    {Array.from({ length: 4 }).map((_, idx) => (
                        <Col key={idx}>
                            <Card>
                                <Card.Img variant="top" src=" " />
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
        </>
    );
}

export default forwardRef(Products);

