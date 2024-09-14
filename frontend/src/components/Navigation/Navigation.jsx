import React from 'react';
import { Link } from 'react-router-dom';
import { Container, Nav, Navbar } from 'react-bootstrap';
import Image from 'react-bootstrap/Image';
import './Navigation.scss';


function Navigation({ onHomeClick, onProductsClick, onTestimonialsClick, onAboutClick, onContactClick }) {
    return (
        <>
            <Navbar expand="lg" classNameName="bg-body-tertiary">
                <Container>
                    <Image src="logo-nav-main.jpeg/100x100" />

                    {/* <Navbar.Brand href="#home">The Homebaker</Navbar.Brand> */}
                    {/* <Image className="logo-nav" src="logo-nav-main.jpeg" alt="" /> */}
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav classNameName="me-auto">
                            {/* <li><Link onClick={onHomeClick}>Home</Link></li>
                            <li><Link onClick={onProductsClick}>Products</Link></li>
                            <li><Link onClick={onTestimonialsClick}>Testimonials</Link></li>
                            <li><Link onClick={onAboutClick}>About</Link></li>
                            <li><Link onClick={onContactClick}>Contact</Link></li> */}
                            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                                <li className="nav-item">
                                    <a className="nav-link active" aria-current="page" href="#">Home</a>
                                </li>
                                <li className="nav-item">
                                    <a className="nav-link active" aria-current="page" href="#">Products</a>
                                </li>
                                <li className="nav-item">
                                    <a className="nav-link active" aria-current="page" href="#">Testimonials</a>
                                </li>
                                <li className="nav-item">
                                    <a className="nav-link active" aria-current="page" href="#">About</a>
                                </li>
                                <li className="nav-item">
                                    <a className="nav-link active" aria-current="page" href="#">Contact</a>
                                </li>
                            </ul>
                            {/* <!-- Search icon visible only on larger screens (lg and up) --> */}
                            <Image className="search-nav d-none d-lg-block" src="search-regular-24.png" alt="" />
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </>
    );
}

export default Navigation;

// {/* <nav className="navbar navbar-expand-lg bg-body-tertiary">
//     <div className="container-fluid">
//         <img className="logo-nav" src="logo-nav-main.jpeg" alt="">
//             <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
//                 <span className="navbar-toggler-icon"></span>
//             </button>
//             <div className="collapse navbar-collapse" id="navbarSupportedContent">
//                 <ul className="navbar-nav me-auto mb-2 mb-lg-0">
//                     <li className="nav-item">
//                         <a className="nav-link active" aria-current="page" href="#">Home</a>
//                     </li>
//                     <li className="nav-item">
//                         <a className="nav-link active" aria-current="page" href="#">Products</a>
//                     </li>
//                     <li className="nav-item">
//                         <a className="nav-link active" aria-current="page" href="#">Testimonials</a>
//                     </li>
//                     <li className="nav-item">
//                         <a className="nav-link active" aria-current="page" href="#">About</a>
//                     </li>
//                     <li className="nav-item">
//                         <a className="nav-link active" aria-current="page" href="#">Contact</a>
//                     </li>
//                 </ul>
//                 {/* <!-- Search icon visible only on larger screens (lg and up) --> */}
//                 <img className="search-nav d-none d-lg-block" src="search-regular-24.png" alt="">
//             </div>
//     </div>
// </nav>
//  */}
