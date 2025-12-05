import React, { useState } from 'react';

const CheckoutPage = () => {
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        billingStreet: '',
        billingCity: '',
        billingState: '',
        billingZip: '',
        shippingStreet: '',
        shippingCity: '',
        shippingState: '',
        shippingZip: '',
        cardNumber: '',
        expiryDate: '',
        cvv: '',
    });

    const [sameAsBilling, setSameAsBilling] = useState(false);
    const [agreedToTerms, setAgreedToTerms] = useState(false);
    const [isPaid, setIsPaid] = useState(false);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSameAsBillingChange = (e) => {
        const isChecked = e.target.checked;
        setSameAsBilling(isChecked);
        if (isChecked) {
            setFormData(prev => ({
                ...prev,
                shippingStreet: prev.billingStreet,
                shippingCity: prev.billingCity,
                shippingState: prev.billingState,
                shippingZip: prev.billingZip
            }));
        } else {
            setFormData(prev => ({
                ...prev,
                shippingStreet: '',
                shippingCity: '',
                shippingState: '',
                shippingZip: ''
            }));
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (agreedToTerms) {
            setIsPaid(true);
        }
    };

    if (isPaid) {
        return (
            <div className="max-w-4xl mx-auto py-16 text-center">
                <h1 className="text-4xl font-bold text-green-600 mb-4">Congrats, Your Payment Is All Set!</h1>
                <p className="text-gray-600 text-lg">Thank you for your purchase.</p>
            </div>
        );
    }

    return (
        <div className="max-w-3xl mx-auto py-8 px-4">
            <h1 className="text-3xl font-bold mb-8">Checkout</h1>

            <form onSubmit={handleSubmit} className="space-y-8">
                {/* Personal Information */}
                <section className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
                    <h2 className="text-xl font-bold mb-4">Personal Information</h2>
                    <div className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">First Name:</label>
                            <input
                                type="text"
                                name="firstName"
                                required
                                value={formData.firstName}
                                onChange={handleInputChange}
                                className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Last Name:</label>
                            <input
                                type="text"
                                name="lastName"
                                required
                                value={formData.lastName}
                                onChange={handleInputChange}
                                className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Email:</label>
                            <input
                                type="email"
                                name="email"
                                required
                                value={formData.email}
                                onChange={handleInputChange}
                                className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Mobile:</label>
                            <input
                                type="tel"
                                name="phone"
                                required
                                value={formData.phone}
                                onChange={handleInputChange}
                                className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                        </div>
                    </div>
                </section>

                {/* Billing Address */}
                <section className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
                    <h2 className="text-xl font-bold mb-4">Billing Address</h2>
                    <div className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Street:</label>
                            <input
                                type="text"
                                name="billingStreet"
                                required
                                value={formData.billingStreet}
                                onChange={(e) => {
                                    handleInputChange(e);
                                    if (sameAsBilling) {
                                        setFormData(prev => ({ ...prev, shippingStreet: e.target.value }));
                                    }
                                }}
                                className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">City:</label>
                            <input
                                type="text"
                                name="billingCity"
                                required
                                value={formData.billingCity}
                                onChange={(e) => {
                                    handleInputChange(e);
                                    if (sameAsBilling) {
                                        setFormData(prev => ({ ...prev, shippingCity: e.target.value }));
                                    }
                                }}
                                className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">State:</label>
                            <input
                                type="text"
                                name="billingState"
                                required
                                value={formData.billingState}
                                onChange={(e) => {
                                    handleInputChange(e);
                                    if (sameAsBilling) {
                                        setFormData(prev => ({ ...prev, shippingState: e.target.value }));
                                    }
                                }}
                                className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">ZIP Code:</label>
                            <input
                                type="text"
                                name="billingZip"
                                required
                                value={formData.billingZip}
                                onChange={(e) => {
                                    handleInputChange(e);
                                    if (sameAsBilling) {
                                        setFormData(prev => ({ ...prev, shippingZip: e.target.value }));
                                    }
                                }}
                                className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                        </div>
                    </div>
                </section>

                {/* Same as Billing Checkbox */}
                <div className="flex items-center bg-white p-4 rounded-lg shadow-sm border border-gray-200">
                    <input
                        type="checkbox"
                        id="sameAsBilling"
                        checked={sameAsBilling}
                        onChange={handleSameAsBillingChange}
                        className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                    />
                    <label htmlFor="sameAsBilling" className="ml-2 block text-sm text-gray-900">
                        Same as billing address
                    </label>
                </div>

                {/* Shipping Address */}
                <section className={`bg-white p-6 rounded-lg shadow-sm border border-gray-200 ${sameAsBilling ? 'opacity-50 pointer-events-none' : ''}`}>
                    <h2 className="text-xl font-bold mb-4">Shipping Address</h2>
                    <div className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Street:</label>
                            <input
                                type="text"
                                name="shippingStreet"
                                required={!sameAsBilling}
                                value={formData.shippingStreet}
                                onChange={handleInputChange}
                                readOnly={sameAsBilling}
                                className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">City:</label>
                            <input
                                type="text"
                                name="shippingCity"
                                required={!sameAsBilling}
                                value={formData.shippingCity}
                                onChange={handleInputChange}
                                readOnly={sameAsBilling}
                                className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">State:</label>
                            <input
                                type="text"
                                name="shippingState"
                                required={!sameAsBilling}
                                value={formData.shippingState}
                                onChange={handleInputChange}
                                readOnly={sameAsBilling}
                                className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">ZIP Code:</label>
                            <input
                                type="text"
                                name="shippingZip"
                                required={!sameAsBilling}
                                value={formData.shippingZip}
                                onChange={handleInputChange}
                                readOnly={sameAsBilling}
                                className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                        </div>
                    </div>
                </section>

                {/* Credit Card Information */}
                <section className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
                    <h2 className="text-xl font-bold mb-4">Credit Card Information</h2>
                    <div className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Card Number:</label>
                            <input
                                type="text"
                                name="cardNumber"
                                required
                                value={formData.cardNumber}
                                onChange={handleInputChange}
                                className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Expiry Date:</label>
                            <input
                                type="text"
                                name="expiryDate"
                                placeholder="MM/YY"
                                required
                                value={formData.expiryDate}
                                onChange={handleInputChange}
                                className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">CVV:</label>
                            <input
                                type="text"
                                name="cvv"
                                required
                                value={formData.cvv}
                                onChange={handleInputChange}
                                className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                        </div>
                    </div>
                </section>

                {/* Terms and Conditions */}
                <div className="flex items-center bg-white p-4 rounded-lg shadow-sm border border-gray-200">
                    <input
                        type="checkbox"
                        id="terms"
                        checked={agreedToTerms}
                        onChange={(e) => setAgreedToTerms(e.target.checked)}
                        className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                    />
                    <label htmlFor="terms" className="ml-2 block text-sm text-gray-900">
                        I agree to the Terms and Conditions
                    </label>
                </div>

                {/* Pay Now Button */}
                <button
                    type="submit"
                    disabled={!agreedToTerms}
                    className={`w-full py-3 px-4 rounded font-bold text-white transition-colors ${agreedToTerms ? 'bg-gray-800 hover:bg-gray-900' : 'bg-gray-400 cursor-not-allowed'}`}
                >
                    Pay Now
                </button>
            </form>
        </div>
    );
};

export default CheckoutPage;
