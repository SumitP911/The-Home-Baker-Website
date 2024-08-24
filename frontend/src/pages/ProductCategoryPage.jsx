import React from 'react';
import { useNavigate } from 'react-router-dom';

function ProductCategoryPage() {
    const navigate = useNavigate();

    const handleProductClick = (productId) => {
        navigate(`/products/${productId}`);
    };

    return (
        <div>
            <h2>Product Categories</h2>
            <button onClick={() => handleProductClick(1)}>Product 1</button>
            <button onClick={() => handleProductClick(2)}>Product 2</button>
            {/* Add more product categories or items here */}
        </div>
    );
}

export default ProductCategoryPage;
