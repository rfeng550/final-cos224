# E-Commerce Project Presentation Guide

This document outlines the key points for your presentation, covering the 3 requirements: Component Explanation, Relationships, and Demonstration.

## 1. Explain Each Component Created (3 points)

Explain the purpose of each file and show the actual code that makes it work.

### **`src/components/Header.jsx`**
*   **Purpose**: The top navigation bar that persists across pages. It allows users to switch between Home, Cart, and Checkout.
*   **Key Code**: We use `Link` from `react-router-dom` instead of `<a>` tags to ensure smooth client-side navigation (no page reload).
```javascript
import { Link } from 'react-router-dom';

const Header = () => {
    return (
        <header className="bg-gray-900 text-white py-4 px-6 flex justify-between items-center">
            {/* ... */}
            <nav>
                <ul className="flex space-x-6">
                    <li><Link to="/" className="hover:text-gray-300">Home</Link></li>
                    <li><Link to="/cart" className="hover:text-gray-300">Cart</Link></li>
                    <li><Link to="/checkout" className="hover:text-gray-300">Checkout</Link></li>
                </ul>
            </nav>
        </header>
    );
};
```

### **`src/components/Footer.jsx`**
*   **Purpose**: The static bottom section of the page displaying contact info and links.
*   **Key Code**: Simple functional component with Tailwind CSS classes for styling.
```javascript
const Footer = () => {
    return (
        <footer className="bg-gray-900 text-gray-400 py-8 text-center text-sm mt-auto">
            <p className="mb-2">Contact us: support@myshop.com | Phone: +61 123 456 789</p>
            <p>Terms & Conditions | Privacy Policy</p>
        </footer>
    );
};
```

### **`src/components/ProductCard.jsx`**
*   **Purpose**: A reusable component used on the Home Page to display a single product's summary.
*   **Key Code**: It accepts `product` data as a prop and uses a callback `onAddToCart` to handle interactions.
```javascript
const ProductCard = ({ product, onAddToCart }) => {
    return (
        <div className="...">
            {/* Clicking image goes to details page */}
            <Link to={`/product/${product.productId}`} className="...">
                <img src={product.imageUrl} alt={product.productId} ... />
            </Link>
            
            <h3 className="text-lg font-semibold mb-2">{product.productId}</h3>
            <p className="text-gray-600 mb-4">{product.price}</p>
            
            <button onClick={() => onAddToCart(product)} className="...">
                Add to Cart
            </button>
        </div>
    );
};
```

### **`src/pages/HomePage.jsx`**
*   **Purpose**: The main landing page. It fetches products from the API and manages the "Load More" and "Add to Cart" logic.
*   **Key Code**:
    *   **Fetching Data**: Uses `useEffect` to load initial batches.
    *   **Load More**: Fetches the next batch when clicked.
    *   **Add to Cart**: Saves the item to `localStorage`.
```javascript
// Data Fetching
const fetchBatch = async (batchNum) => {
    const response = await fetch(`https://huitian.serv00.net/project/?type=list&batchNumber=${batchNum}`);
    return await response.json();
};

// Load More Logic
const handleLoadMore = async () => {
    const data = await fetchBatch(nextBatch);
    if (data) {
        setProducts(prev => [...prev, ...data.products]);
        setHasMore(data.moreProducts);
        setNextBatch(prev => prev + 1);
    }
};

// Add to Cart Logic
const handleAddToCart = (product) => {
    const cart = JSON.parse(localStorage.getItem('cart') || '{}');
    cart[product.productId] = {
        ...product,
        image: product.imageUrl, // Map API image to cart format
        quantity: (cart[product.productId]?.quantity || 0) + 1
    };
    localStorage.setItem('cart', JSON.stringify(cart));
    console.log(`Added ${product.productId} to cart!`);
};
```

### **`src/pages/ProductDetailsPage.jsx`**
*   **Purpose**: Displays detailed information for a specific product selected by the user.
*   **Key Code**:
    *   **URL Parameter**: Uses `useParams` to know which product to fetch.
    *   **Image Gallery**: Updates `mainImage` state when a thumbnail is clicked.
```javascript
import { useParams } from 'react-router-dom';

const ProductDetailsPage = () => {
    const { productId } = useParams(); // Get ID from URL (e.g., "IPHONE17")
    const [mainImage, setMainImage] = useState('');

    // Fetch single product details
    useEffect(() => {
        const fetchProduct = async () => {
            const response = await fetch(`https://huitian.serv00.net/project/?productId=${productId}`);
            const data = await response.json();
            setProduct(data);
            if (data.imageUrls) setMainImage(data.imageUrls[0]);
        };
        fetchProduct();
    }, [productId]);

    // Image Gallery Interaction
    // ... inside return ...
    {product.imageUrls.map((img, index) => (
        <div onClick={() => setMainImage(img)} ... >
            <img src={img} ... />
        </div>
    ))}
```

### **`src/pages/CartPage.jsx`**
*   **Purpose**: Displays selected items, allows quantity adjustment, and calculates the total price.
*   **Key Code**:
    *   **Initialization**: Reads from `localStorage`.
    *   **Update Quantity**: Modifies the cart object and saves it back.
    *   **Total Calculation**: Iterates through items to sum `price * quantity`.
```javascript
// Read Cart
useEffect(() => {
    const cart = JSON.parse(localStorage.getItem('cart') || '{}');
    setCartItems(Object.values(cart));
}, []);

// Update Quantity
const updateQuantity = (productId, change) => {
    const cart = JSON.parse(localStorage.getItem('cart') || '{}');
    if (cart[productId]) {
        cart[productId].quantity += change;
        if (cart[productId].quantity <= 0) delete cart[productId];
        
        localStorage.setItem('cart', JSON.stringify(cart)); // Save
        setCartItems(Object.values(cart)); // Update UI
    }
};

// Calculate Total
const calculateTotal = () => {
    return cartItems.reduce((total, item) => {
        // Parse price string "$1699" to number 1699
        let price = parseFloat(item.price.replace(/[^0-9.-]+/g, ""));
        return total + (price * item.quantity);
    }, 0);
};
```

---

## 2. Explain Relationships Between Components (2 points)

Explain how the parts connect to form the whole app.

### **Routing (`src/App.jsx`)**
The `App` component acts as the traffic controller. It uses `react-router-dom` to map URLs to specific components.
```javascript
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<HomePage />} />
          <Route path="cart" element={<CartPage />} />
          <Route path="product/:productId" element={<ProductDetailsPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
```
*   **Relationship**: `Layout` wraps all pages, so the Header and Footer are always visible. `HomePage`, `CartPage`, etc., are rendered inside the `Layout` based on the URL.

### **Data Flow (Props & State)**
*   **Parent-to-Child**: `HomePage` fetches the list of products and passes individual product data to the `ProductCard` child component using **props**.
    ```javascript
    // HomePage.jsx
    <ProductCard product={product} onAddToCart={handleAddToCart} />
    ```
*   **URL Parameters**: When you click a product on the Home page, the URL changes to `/product/IPHONE17`. The `ProductDetailsPage` reads this ID using `useParams()` to know which data to fetch.

### **Data Persistence (LocalStorage)**
*   Since we don't have a backend database for the cart, we use the browser's `localStorage` as a shared data store.
*   **Home/Details Pages** *write* to `localStorage` (Add item).
*   **Cart Page** *reads* from `localStorage` (Display items).
*   This relationship allows independent pages to share the same cart state.

---

## 3. Demonstration Steps (3 points)

Follow this flow to demonstrate the "How to use" requirement.

1.  **Start at Home Page**:
    *   "Here is the Home Page showing the initial batch of products."
    *   **Action**: Scroll down and click **"Load More Products"**.
    *   "As you can see, it fetches and appends the next batch of products dynamically."

2.  **Add to Cart from Home**:
    *   **Action**: Click **"Add to Cart"** on one of the phones (e.g., iPhone 15).
    *   "I'll add this item to the cart. It's saved in the background."

3.  **View Product Details**:
    *   **Action**: Click the image of a different product (e.g., iPhone 17).
    *   "Clicking the image takes us to the Product Details page."
    *   **Action**: Click different **thumbnail images** on the left.
    *   "We have an interactive image gallery. Clicking thumbnails updates the main view."
    *   **Action**: Point out the specs (Screen, Battery, etc.).
    *   **Action**: Click **"Add to Cart"**.

4.  **Manage Cart**:
    *   **Action**: Click the **"Cart"** link in the Header.
    *   "Now let's go to the Shopping Cart."
    *   **Action**: Show the items you added.
    *   **Action**: Click the **"+"** button to increase quantity. Point to the **Total** price updating instantly.
    *   **Action**: Click **"-"** to decrease.

5.  **Proceed to Checkout**:
    *   **Action**: Click the **"Check Out"** button.
    *   "Finally, this takes us to the Checkout page (which is handled by my teammate)."
