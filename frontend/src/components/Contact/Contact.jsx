import React, { forwardRef, useEffect, useState } from 'react'
import { Container, Row, Col, Form, Button } from 'react-bootstrap';

import instagramIcon from './instagram-icon.png';
import facebookIcon from './facebook-icon.png';
import phoneIcon from './phone-icon.png';
import locationIcon from './location-icon.png';
import emailIcon from './email-icon.png';
import shareIcon from './share-icon.png';

import './Contact.scss';

// Function to handle the form submission
const submitTestimonial = async (name, email, review, setSuccessMessage, setErrorMessage) => {
    const testimonialData = {
        data: {
            Name: name,
            Email: email,
            Review: review,
        }
    };

    try {
        // const response = await fetch('http://localhost:1337/api/testimonials', {
        // const response = await fetch('http://192.168.1.34:1337/api/testimonials', {
        const response = await fetch('http://192.168.174.231:1337/api/testimonials', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(testimonialData),
        });

        if (response.ok) {
            setSuccessMessage('Your review has been submitted successfully!');
        } else {
            const errorData = await response.json();
            console.error('Error submitting testimonial:', errorData);
            setErrorMessage('Failed to submit your review. Please try again later.');
        }
    } catch (error) {
        console.error('Error submitting testimonial:', error);
        setErrorMessage('An error occurred. Please try again later.');
    }
};

function Contact() {
    const [contactInfo, setContactInfo] = useState(null); // State to store the contact data
    const [loading, setLoading] = useState(true); // Loading 
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [review, setReview] = useState('');
    const [successMessage, setSuccessMessage] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    useEffect(() => {
        // fetch("http://localhost:1337/api/contact")
        // fetch("http://192.168.1.34:1337/api/contact")
        fetch("http://192.168.174.231:1337/api/contact")
            .then(response => response.json())
            .then(data => {
                setContactInfo(data.data); // Assuming only one contact entry
                setLoading(false);
            })
            .catch(error => {
                console.error("Error fetching contact data:", error);
                setLoading(false);
            });
    }, []);

    const handleSubmit = (e) => {
        e.preventDefault();
        submitTestimonial(name, email, review, setSuccessMessage, setErrorMessage);
        setName('');
        setEmail('');
        setReview('');
    };

    if (loading) {
        return <p>Loading...</p>;
    }

    if (!contactInfo) {
        return <p>No contact information available.</p>;
    }

    return (
        <Container fluid className="contact-main-div p-4">
            <Row className="g-5">
                {/* Contact Form Section */}
                <Col md={6} className="contact-left-container">
                    <div className="contact-form">
                        <h3 className="send-msg m-5 text-center">Leave a Review</h3>
                        <Form onSubmit={handleSubmit}>
                            <Form.Group className="mb-3" controlId="name">
                                <Form.Label>Name</Form.Label>
                                <Form.Control
                                    type="text"
                                    placeholder="Your name"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    required
                                />
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="email">
                                <Form.Label>E-mail</Form.Label>
                                <Form.Control
                                    type="email"
                                    placeholder="customer@email.com"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    required
                                />
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="message">
                                <Form.Label>Review</Form.Label>
                                <Form.Control
                                    as="textarea"
                                    rows={6}
                                    placeholder="Your review"
                                    value={review}
                                    onChange={(e) => setReview(e.target.value)}
                                    required
                                />
                            </Form.Group>
                            <Button type="submit" className="w-100 custom-btn">
                                Send
                            </Button>
                        </Form>
                        {successMessage && <div className="mt-3 text-success">{successMessage}</div>}
                        {errorMessage && <div className="mt-3 text-danger">{errorMessage}</div>}
                    </div>
                </Col>

                {/* Contact Information Section */}
                <Col md={6} className="contact-right-container">
                    <div className="container-fluid px-0 mb-3">
                        <h3 className="contact-information text-center m-5">Contact Information</h3>
                        <div className='mb-4'>
                            <Row>
                                <Col md={6}>
                                    <div className='d-flex'>
                                        <img
                                            src={phoneIcon}
                                            alt="Phone Icon"
                                            height="20"
                                            width="20"
                                            className='me-1' />
                                        <h6>Phone Number</h6>
                                    </div>
                                    <p>
                                        +91 {contactInfo.Phone}
                                    </p>
                                </Col>
                                <Col md={6}>
                                    <div className='d-flex'>
                                        <img
                                            src={emailIcon}
                                            alt="Phone Icon"
                                            height="20"
                                            width="20"
                                            className='me-1' />
                                        <h6>Email</h6>
                                    </div>
                                    <p>
                                        {contactInfo.Email}
                                    </p>
                                </Col>
                            </Row>

                            <Row>
                                <Col md={6}>
                                    <div className='d-flex'>
                                        <img
                                            src={locationIcon}
                                            alt="Phone Icon"
                                            height="20"
                                            width="20"
                                            className='me-1' />
                                        <h6>Location</h6>
                                    </div>
                                    <p>
                                        {contactInfo.Location}
                                    </p>
                                </Col>
                                <Col md={6}>
                                    <div className='d-flex'>
                                        <img
                                            src={shareIcon}
                                            alt="Phone Icon"
                                            height="20"
                                            width="20"
                                            className='me-1' />
                                        <h6>Connect</h6>
                                    </div>
                                    <div className="social-links d-flex">
                                        {/* Instagram Icon */}
                                        <a
                                            href="https://www.instagram.com/the__homebaker?igsh=czdhcjhraGt2b3pt"
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="me-2"
                                        >
                                            <img
                                                src={instagramIcon}
                                                alt="Instagram"
                                                width="25"
                                                height="25"
                                            />
                                        </a>

                                        {/* Facebook Icon */}
                                        <a
                                            href="https://www.facebook.com/mitali.dukale?mibextid=ZbWKwL"
                                            target="_blank"
                                            rel="noopener noreferrer"
                                        >
                                            <img
                                                src={facebookIcon}
                                                alt="Facebook"
                                                width="25"
                                                height="25"
                                            />
                                        </a>
                                    </div>
                                </Col>
                            </Row>
                        </div>

                        <div className="map">
                            <iframe
                                src="https://www.google.com/maps/embed?pb=!1m17!1m12!1m3!1d3783.2900148174485!2d73.77837!3d18.515791999999998!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m2!1m1!2zMTjCsDMwJzU2LjkiTiA3M8KwNDYnNDIuMSJF!5e0!3m2!1sen!2sin!4v1736920791784!5m2!1sen!2sin"
                                title="Google Map"
                                width="100%"
                                height="250"
                                style={{ border: 0, borderRadius: '0.5rem' }}
                                allowFullScreen={true}
                                loading="lazy"
                                referrerPolicy="no-referrer-when-downgrade"
                            ></iframe>
                        </div>
                    </div>
                </Col>
            </Row>
        </Container>
    );
}

export default forwardRef(Contact);