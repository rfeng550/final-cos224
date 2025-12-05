import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

const ProductCard = ({ product, onAddToCart }) => {
    return (
        <div className="bg-white border border-gray-200 rounded-lg shadow-sm p-4 flex flex-col items-center text-center h-full">
            <Link to={`/product/${product.productId}`} className="w-full h-48 bg-gray-200 mb-4 rounded-md overflow-hidden flex items-center justify-center cursor-pointer">
                {product.imageUrl ? (
                    <img
                        src={product.imageUrl}
                        alt={product.productId}
                        className="w-full h-full object-contain"
                    />
                ) : (
                    <span className="text-gray-400">Product Image</span>
                )}
            </Link>
            <h3 className="text-lg font-semibold mb-2">{product.productId}</h3>
            <p className="text-gray-600 mb-4">{product.price}</p>
            <button
                onClick={() => onAddToCart(product)}
                className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition-colors w-full mt-auto"
            >
                Add to Cart
            </button>
        </div>
    );
};

ProductCard.propTypes = {
    product: PropTypes.shape({
        productId: PropTypes.string.isRequired,
        imageUrl: PropTypes.string,
        price: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    }).isRequired,
    onAddToCart: PropTypes.func.isRequired,
};

export default ProductCard;
