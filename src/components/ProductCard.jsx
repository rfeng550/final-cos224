import React from 'react';
import { Link } from 'react-router-dom';

const ProductCard = ({ product, onAddToCart }) => {
    return (
        <div className="bg-white border border-gray-200 rounded-lg shadow-sm p-4 flex flex-col items-center text-center">
            <div className="w-full h-48 bg-gray-200 mb-4 rounded-md overflow-hidden flex items-center justify-center">
                {product.imageUrl ? (
                    <img
                        src={product.imageUrl}
                        alt={product.productId}
                        className="w-full h-full object-contain"
                    />
                ) : (
                    <span className="text-gray-400">Product Image</span>
                )}
            </div>
            <h3 className="text-lg font-semibold mb-2">{product.productId}</h3>
            <p className="text-gray-600 mb-4">{product.price}</p>
            <div className="mt-auto flex flex-col gap-2 w-full">
                <Link
                    to={`/product/${product.productId}`}
                    className="block w-full"
                >
                    {/* Invisible link overlay or just make the image clickable? 
               PRD says "Clicking image -> Product Details page".
               I'll wrap the image in Link in the actual code above or here.
           */}
                </Link>
                <button
                    onClick={() => onAddToCart(product)}
                    className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition-colors w-full"
                >
                    Add to Cart
                </button>
            </div>
        </div>
    );
};

// Re-writing to wrap image in Link as per PRD
const ProductCardFinal = ({ product, onAddToCart }) => {
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

export default ProductCardFinal;
