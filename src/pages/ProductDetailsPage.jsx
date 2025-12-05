import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

const ProductDetailsPage = () => {
    const { productId } = useParams();
    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);
    const [mainImage, setMainImage] = useState('');

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const response = await fetch(`https://huitian.serv00.net/project/?productId=${productId}`);
                const data = await response.json();
                setProduct(data);
                if (data.imageUrls && data.imageUrls.length > 0) {
                    setMainImage(data.imageUrls[0]);
                }
            } catch (error) {
                console.error('Error fetching product details:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchProduct();
    }, [productId]);

    const handleAddToCart = () => {
        if (!product) return;

        const cart = JSON.parse(localStorage.getItem('cart') || '{}');
        const currentQty = cart[product.productId]?.quantity || 0;

        // Use the first image as the thumbnail for the cart
        const cartImage = product.imageUrls && product.imageUrls.length > 0 ? product.imageUrls[0] : '';

        cart[product.productId] = {
            productId: product.productId,
            price: product.price, // Assuming price is a number or string like "$1699" - need to handle parsing if needed for calc, but for storage keep as is or clean
            quantity: currentQty + 1,
            image: cartImage
        };

        localStorage.setItem('cart', JSON.stringify(cart));

    };

    if (loading) return <div className="text-center py-8">Loading...</div>;
    if (!product) return <div className="text-center py-8">Product not found</div>;

    return (
        <div className="max-w-4xl mx-auto">
            {/* Top Section: Images */}
            <div className="flex flex-col md:flex-row gap-6 mb-8">
                {/* Thumbnails */}
                <div className="flex md:flex-col gap-4 order-2 md:order-1">
                    {product.imageUrls && product.imageUrls.map((img, index) => (
                        <div
                            key={index}
                            onClick={() => setMainImage(img)}
                            className={`w-20 h-20 bg-gray-200 rounded-md cursor-pointer border-2 flex items-center justify-center overflow-hidden ${mainImage === img ? 'border-blue-500' : 'border-transparent'}`}
                        >
                            <img src={img} alt={`Thumbnail ${index + 1}`} className="w-full h-full object-contain" />
                        </div>
                    ))}
                    {/* Fallback if no images or fewer than 4 placeholders needed to match design exactly? 
              Design shows 4 placeholders. If API returns fewer, we just show what we have.
          */}
                </div>

                {/* Main Image */}
                <div className="flex-grow bg-gray-300 rounded-lg flex items-center justify-center h-96 order-1 md:order-2">
                    {mainImage ? (
                        <img src={mainImage} alt={product.productId} className="w-full h-full object-contain" />
                    ) : (
                        <span className="text-gray-500 text-xl">Main Product Image</span>
                    )}
                </div>
            </div>

            {/* Bottom Section: Details Card */}
            <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-100">
                <h1 className="text-3xl font-bold mb-2">Product ID: {product.productId}</h1>
                <p className="text-xl font-semibold mb-4">Price: {typeof product.price === 'number' ? `$${product.price}` : product.price}</p>

                <button
                    onClick={handleAddToCart}
                    className="bg-blue-500 text-white px-6 py-2 rounded hover:bg-blue-600 transition-colors mb-6"
                >
                    Add to Cart
                </button>

                <div className="space-y-2 text-gray-800">
                    <p><span className="font-bold">Description:</span> {product.longDescription || product.shortDescription}</p>
                    <p><span className="font-bold">Screen Size:</span> {product.screenSize}</p>
                    <p><span className="font-bold">Weight:</span> {product.weight}</p>
                    <p><span className="font-bold">Battery Spec:</span> {product.batterySpec}</p>
                </div>
            </div>
        </div>
    );
};

export default ProductDetailsPage;
