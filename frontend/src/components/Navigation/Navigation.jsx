import React from 'react';
import { Link as ScrollLink } from 'react-scroll';
import { Container, Nav, Navbar } from 'react-bootstrap';
import logo from './logo-nav-main.jpeg';
import SearchButton from './search-regular-24.png';
import './Navigation.scss';


function Navigation({ showScrollButtons }) {
    return (
        <>
            <Navbar expand="lg" className="bg-body-tertiary" fixed="top">
                <Container>
                    <img
                        src={logo}
                        alt="Logo"
                        width="50"
                        height="50"
                        className="d-inline-block align-top"
                    />
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="me-auto">
                            {/* <Link to="/">Home</Link> */}
                            {showScrollButtons && (
                                <>
                                    <ScrollLink to="home" smooth={true} duration={300}>Home</ScrollLink>
                                    <ScrollLink to="products" smooth={true} duration={300}>Products</ScrollLink>
                                    <ScrollLink to="testimonials" smooth={true} duration={300}>Testimonials</ScrollLink>
                                    <ScrollLink to="about" smooth={true} duration={300}>About</ScrollLink>
                                    <ScrollLink to="contact" smooth={true} duration={300}>Contact</ScrollLink>
                                </>
                            )}
                            {/* <Link to="/some-other-page">Other Page</Link> */}

                            <img
                                src={SearchButton}
                                width="25"
                                height="25"
                                className="d-inline-block align-top"
                                alt="Search Button"
                            />
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
