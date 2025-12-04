import React, { useState, useEffect } from 'react';
import ProductCard from '../components/ProductCard';

const HomePage = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [hasMore, setHasMore] = useState(true);
    const [nextBatch, setNextBatch] = useState(1);

    const fetchBatch = async (batchNum) => {
        try {
            const response = await fetch(`https://huitian.serv00.net/project/?type=list&batchNumber=${batchNum}`);
            const data = await response.json();
            return data;
        } catch (error) {
            console.error('Error fetching products:', error);
            return null;
        }
    };

    useEffect(() => {
        const loadInitialData = async () => {
            setLoading(true);
            const batch1 = await fetchBatch(1);
            const batch2 = await fetchBatch(2);

            let newProducts = [];
            let more = false;

            if (batch1) {
                newProducts = [...newProducts, ...batch1.products];
                more = batch1.moreProducts;
            }
            if (batch2) {
                newProducts = [...newProducts, ...batch2.products];
                more = batch2.moreProducts; // Use the flag from the latest batch
            }

            setProducts(newProducts);
            setHasMore(more);
            setNextBatch(3);
            setLoading(false);
        };

        loadInitialData();
    }, []);

    const handleLoadMore = async () => {
        setLoading(true);
        const data = await fetchBatch(nextBatch);
        if (data) {
            setProducts(prev => [...prev, ...data.products]);
            setHasMore(data.moreProducts);
            setNextBatch(prev => prev + 1);
        }
        setLoading(false);
    };

    const handleAddToCart = (product) => {
        // TODO: Implement cart logic
        console.log('Added to cart:', product);

        // Temporary alert or toast could be added here
        // For now, just reading from localStorage to update it
        const cart = JSON.parse(localStorage.getItem('cart') || '{}');
        const currentQty = cart[product.productId]?.quantity || 0;

        cart[product.productId] = {
            ...product,
            image: product.imageUrl, // Map API's imageUrl to cart's expected image property
            quantity: currentQty + 1
        };

        localStorage.setItem('cart', JSON.stringify(cart));
        // Ideally we would use a Context or Redux to update header count immediately
        console.log(`Added ${product.productId} to cart!`);
    };

    return (
        <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mb-8">
                {products.map((product, index) => (
                    // Using index as key fallback if productId is not unique across batches (though it should be)
                    <ProductCard
                        key={`${product.productId}-${index}`}
                        product={product}
                        onAddToCart={handleAddToCart}
                    />
                ))}
            </div>

            {loading && <p className="text-center text-gray-500 my-4">Loading...</p>}

            {!loading && hasMore && (
                <div className="text-center">
                    <button
                        onClick={handleLoadMore}
                        className="bg-green-500 text-white px-6 py-2 rounded hover:bg-green-600 transition-colors font-semibold"
                    >
                        Load More Products
                    </button>
                </div>
            )}
        </div>
    );
};

export default HomePage;
