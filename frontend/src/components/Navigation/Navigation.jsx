import React, { useState, useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import { Link } from 'react-scroll';
import { Container, Nav, Navbar } from 'react-bootstrap';

import logo from './logo-nav-main.jpeg';
import SearchButton from './search-icon.png';
import instagramIcon from './instagram-icon.png';
import facebookIcon from './facebook-icon.png';

import './Navigation.scss';

function Navigation() {
    const [isNavOpen, setIsNavOpen] = useState(false); // Track the state of the navbar
    const [isSearchOpen, setIsSearchOpen] = useState(false); // Track search box visibility
    const [searchQuery, setSearchQuery] = useState(''); // Store search query
    const [searchResults, setSearchResults] = useState([]); // Store search results
    const navbarRef = useRef(null);
    const location = useLocation(); // Get the current route
    const isHomePage = location.pathname === "/"; // Check if the current page is Home

    const handleToggleClick = () => {
        setIsNavOpen(!isNavOpen);
    };

    const handleSearchToggle = () => {
        setIsSearchOpen(!isSearchOpen); // Toggle search box visibility
        setSearchQuery(''); // Clear the search query when opening the search box
    };

    const handleSearchChange = (event) => {
        setSearchQuery(event.target.value);
    };

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (
                navbarRef.current &&
                !navbarRef.current.contains(event.target) &&
                isNavOpen
            ) {
                setIsNavOpen(false); // Close the navbar if clicking outside
            }
        };

        document.addEventListener("click", handleClickOutside);
        return () => {
            document.removeEventListener("click", handleClickOutside);
        };
    }, [isNavOpen]);

    // Example search filtering function (can be adjusted as per actual API call structure)
    const filterSearchResults = (query) => {
        // Mocked search results based on the query, adjust based on actual API structure
        const products = [
            { Name: "Vanilla Tea Cake", Category: "Tea Cakes" },
            { Name: "Chocolate Tea Cake", Category: "Tea Cakes" },
            { Name: "Marble Tea Cake", Category: "Tea Cakes" },
            { Name: "Banana-Cocoa Tea Cake", Category: "Tea Cakes" },
        ];
        const categories = [
            { Name: "Tea Cakes" },
            { Name: "Chocolate Cakes" },
        ];

        const filteredProducts = products.filter((product) =>
            product.Name.toLowerCase().includes(query.toLowerCase())
        );
        const filteredCategories = categories.filter((category) =>
            category.Name.toLowerCase().includes(query.toLowerCase())
        );

        setSearchResults({
            products: filteredProducts,
            categories: filteredCategories,
        });
    };

    useEffect(() => {
        if (searchQuery.trim() !== '') {
            filterSearchResults(searchQuery);
        } else {
            setSearchResults({
                products: [],
                categories: [],
            });
        }
    }, [searchQuery]);

    return (
        <Navbar
            expand="lg"
            className="navbar fixed-top px-0"
            expanded={isNavOpen}
            onToggle={handleToggleClick}
            ref={navbarRef} // Attach ref to the navbar
        >
            <Container fluid className="px-0">
                {/* Hamburger menu on the left */}
                <Navbar.Toggle aria-controls="navbar-nav" className="ms-3" />

                {/* Logo in the middle */}
                <Navbar.Brand href="#" className="navbar-logo">
                    <img
                        className="logo-nav d-inline-block align-top"
                        src={logo}
                        alt="Logo"
                        width="50"
                        height="50"
                    />
                </Navbar.Brand>

                {/* Search icon for mobile view */}
                <form className="d-flex d-lg-none me-4" onClick={handleSearchToggle}>
                    <img
                        className="search-nav"
                        src={SearchButton}
                        alt="Search"
                        style={{ cursor: 'pointer' }}
                    />
                </form>

                {/* Search Box (Visible when the search icon is clicked) */}
                {isSearchOpen && (
                    <div className="search-box">
                        <input
                            type="text"
                            value={searchQuery}
                            onChange={handleSearchChange}
                            placeholder="Search products or categories..."
                            className="search-input"
                        />
                        <div className="search-results">
                            {searchResults.products.length > 0 && (
                                <div>
                                    <h5>Products:</h5>
                                    <ul>
                                        {searchResults.products.map((product) => (
                                            <li key={product.Name}>{product.Name}</li>
                                        ))}
                                    </ul>
                                </div>
                            )}
                            {searchResults.categories.length > 0 && (
                                <div>
                                    <h5>Categories:</h5>
                                    <ul>
                                        {searchResults.categories.map((category) => (
                                            <li key={category.Name}>{category.Name}</li>
                                        ))}
                                    </ul>
                                </div>
                            )}
                        </div>
                    </div>
                )}

                <Navbar.Collapse id="navbar-nav" className="justify-content-between">
                    {!isHomePage ? (
                        <div className="placeholder-spacer me-auto"></div>
                    ) : (
                        <Nav className="nav-buttons me-auto mb-lg-0 ms-4 mb-2">
                            <Link to="home" smooth={true} duration={500} offset={-80} className="nav-link">
                                Home
                            </Link>
                            <Link to="products" smooth={true} duration={500} offset={-80} className="nav-link">
                                Products
                            </Link>
                            <Link to="testimonials" smooth={true} duration={500} offset={-80} className="nav-link">
                                Testimonials
                            </Link>
                            <Link to="about" smooth={true} duration={500} offset={-80} className="nav-link">
                                About
                            </Link>
                            <Link to="contact" smooth={true} duration={500} offset={-80} className="nav-link">
                                Contact
                            </Link>
                        </Nav>
                    )}

                    {/* Contact Buttons for collapsed Navbar */}
                    <div className="social-icons d-flex d-lg-none align-items-center ms-4 mb-4 mt-3">
                        <a
                            href="https://www.instagram.com/the__homebaker?igsh=czdhcjhraGt2b3pt"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="me-2"
                        >
                            <img src={instagramIcon} alt="Instagram" width="30" height="30" />
                        </a>
                        <a
                            href="https://www.facebook.com/mitali.dukale?mibextid=ZbWKwL"
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            <img src={facebookIcon} alt="Facebook" width="30" height="30" />
                        </a>
                    </div>

                    {/* Search icon for desktop view */}
                    <img
                        className="search-nav d-none d-lg-block me-4"
                        src={SearchButton}
                        width="30"
                        height="30"
                        alt="Search Button"
                        style={{ cursor: 'pointer' }}
                        onClick={handleSearchToggle}
                    />
                </Navbar.Collapse>
            </Container>
        </Navbar>

    );
}

export default Navigation;
