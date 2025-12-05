import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const CartPage = () => {
    const [cartItems, setCartItems] = useState(() => {
        const cart = JSON.parse(localStorage.getItem('cart') || '{}');
        return Object.values(cart);
    });
    const navigate = useNavigate();

    const updateQuantity = (productId, change) => {
        const cart = JSON.parse(localStorage.getItem('cart') || '{}');
        if (cart[productId]) {
            const newQuantity = cart[productId].quantity + change;
            if (newQuantity <= 0) {
                delete cart[productId];
            } else {
                cart[productId].quantity = newQuantity;
            }
            localStorage.setItem('cart', JSON.stringify(cart));
            setCartItems(Object.values(cart));
        }
    };

    const calculateTotal = () => {
        return cartItems.reduce((total, item) => {
            // Price might be a string like "$1699" or number 1699. 
            // We need to parse it safely.
            let price = item.price;
            if (typeof price === 'string') {
                price = parseFloat(price.replace(/[^0-9.-]+/g, ""));
            }
            return total + (price * item.quantity);
        }, 0);
    };

    const formatPrice = (price) => {
        if (typeof price === 'number') return `$${price}`;
        return price;
    };

    const getNumericPrice = (price) => {
        if (typeof price === 'number') return price;
        return parseFloat(price.replace(/[^0-9.-]+/g, ""));
    }

    return (
        <div className="max-w-4xl mx-auto">
            <h1 className="text-2xl font-bold mb-6">Your Shopping Cart</h1>

            <div className="space-y-6">
                {cartItems.length === 0 ? (
                    <p>Your cart is empty.</p>
                ) : (
                    cartItems.map((item) => (
                        <div key={item.productId} className="flex flex-col md:flex-row items-center border-b border-gray-200 pb-6 gap-4">
                            {/* Image */}
                            <div className="w-24 h-24 bg-gray-200 flex-shrink-0 flex items-center justify-center">
                                {item.image || item.imageUrl ? (
                                    <img src={item.image || item.imageUrl} alt={item.productId} className="w-full h-full object-contain" />
                                ) : (
                                    <span className="text-gray-500 text-sm">Image</span>
                                )}
                            </div>

                            {/* Product Info */}
                            <div className="flex-grow text-center md:text-left">
                                <div className="font-semibold text-lg">Product ID: {item.productId}</div>
                                <div className="text-gray-600">Price: {formatPrice(item.price)}</div>
                            </div>

                            {/* Quantity and Total */}
                            <div className="flex items-center gap-4">
                                <div className="flex items-center border border-gray-300 rounded">
                                    <button
                                        onClick={() => updateQuantity(item.productId, -1)}
                                        className="px-3 py-1 hover:bg-gray-100 border-r border-gray-300"
                                    >
                                        -
                                    </button>
                                    <span className="px-4 py-1">{item.quantity}</span>
                                    <button
                                        onClick={() => updateQuantity(item.productId, 1)}
                                        className="px-3 py-1 hover:bg-gray-100 border-l border-gray-300"
                                    >
                                        +
                                    </button>
                                </div>
                                <div className="font-semibold text-lg min-w-[80px] text-right">
                                    ${(getNumericPrice(item.price) * item.quantity).toFixed(0)}
                                </div>
                            </div>
                        </div>
                    ))
                )}
            </div>

            {cartItems.length > 0 && (
                <div className="mt-8 flex flex-col items-end">
                    <div className="text-2xl font-bold mb-4">
                        Total: ${calculateTotal().toFixed(0)}
                    </div>
                    <button
                        onClick={() => navigate('/checkout')}
                        className="bg-gray-800 text-white px-8 py-3 rounded hover:bg-gray-900 transition-colors text-lg"
                    >
                        Check Out
                    </button>
                </div>
            )}
        </div>
    );
};

export default CartPage;
