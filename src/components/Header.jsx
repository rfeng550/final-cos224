import React from 'react';
import { Link } from 'react-router-dom';

const Header = () => {
    return (
        <header className="bg-gray-900 text-white py-4 px-6 flex justify-between items-center">
            <div className="text-xl font-bold">
                <Link to="/">MyShop</Link>
            </div>
            <nav>
                <ul className="flex space-x-6">
                    <li>
                        <Link to="/" className="hover:text-gray-300">Home</Link>
                    </li>
                    <li>
                        <Link to="/cart" className="hover:text-gray-300">Cart</Link>
                    </li>
                    <li>
                        <Link to="/checkout" className="hover:text-gray-300">Checkout</Link>
                    </li>
                </ul>
            </nav>
        </header>
    );
};

export default Header;
