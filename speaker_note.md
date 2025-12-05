# E-Commerce React App Presentation — Slides & Speaker Notes

## Slide 1 — Title Slide
### Speaker Notes:
Hello everyone, today I’ll be presenting my E-Commerce React application for the COS204 final project. I’ll walk through the components I built, how they are connected, and finally demonstrate how the app works from the user’s perspective.

---

## Slide 2 — Agenda
### Speaker Notes:
The presentation has three main sections.
1. I’ll explain each major component in the project.
2. I’ll show how these components connect and share data.
3. And finally, I’ll demonstrate the key user actions like browsing products, viewing details, and managing the shopping cart.

---

## Slide 3 — Application Structure
### Speaker Notes:
This diagram shows the overall structure of my React application.  
At the top level, every page is wrapped by a Layout component that includes the Header and Footer so the navigation stays consistent.  
The main pages include the Home Page, Product Details Page, Cart Page, and Checkout Page.  
All routing is handled inside `App.jsx`, which maps URLs to specific components.

---

## Slide 4 — Header.jsx
### Speaker Notes:
The Header component is the navigation bar that appears on every page.  
It uses `Link` from `react-router-dom` so the navigation happens smoothly without reloading the page.  
This keeps the app functioning like a real single-page application.

**Code:**
```jsx
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

---

## Slide 5 — Footer.jsx
### Speaker Notes:
The Footer is also persistent across pages.  
It contains contact information and links like Terms and Privacy Policy.  
It’s a simple functional component styled with Tailwind classes, but it keeps the UI consistent and professional.

**Code:**
```jsx
const Footer = () => {
    return (
        <footer className="bg-gray-900 text-gray-400 py-8 text-center text-sm mt-auto">
            <p className="mb-2">Contact us: support@myshop.com | Phone: +61 123 456 789</p>
            <p>Terms & Conditions | Privacy Policy</p>
        </footer>
    );
};
```

---

## Slide 6 — ProductCard.jsx
### Speaker Notes:
The ProductCard component is reusable and appears multiple times on the Home Page — once for each product.  
It receives product data as props, displays the image, name, and price, and includes an Add to Cart button.  
When the user clicks on a product image, it navigates to the Product Details Page.  
When they click Add to Cart, it sends the product back to the parent component.

**Code:**
```jsx
const ProductCard = ({ product, onAddToCart }) => {
    return (
        <div className="...">
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

---

## Slide 7 — HomePage.jsx
### Speaker Notes:
The Home Page handles three major features.  
It fetches product data from the API, batch by batch.  
It dynamically loads more products when the user clicks Load More Products.  
And it manages the Add to Cart logic by saving the user’s selected items into localStorage.  
This allows the cart to persist even when the user refreshes the page.

**Code:**
```jsx
const fetchBatch = async (batchNum) => {
    const response = await fetch(
        `https://huitian.serv00.net/project/?type=list&batchNumber=${batchNum}`
    );
    return await response.json();
};

const handleLoadMore = async () => {
    const data = await fetchBatch(nextBatch);
    if (data) {
        setProducts(prev => [...prev, ...data.products]);
        setHasMore(data.moreProducts);
        setNextBatch(prev => prev + 1);
    }
};

const handleAddToCart = (product) => {
    const cart = JSON.parse(localStorage.getItem('cart') || '{}');
    cart[product.productId] = {
        ...product,
        image: product.imageUrl,
        quantity: (cart[product.productId]?.quantity || 0) + 1
    };
    localStorage.setItem('cart', JSON.stringify(cart));
};
```

---

## Slide 8 — ProductDetailsPage.jsx
### Speaker Notes:
The Product Details Page starts by reading the product ID from the URL using `useParams()`.  
Then it fetches the full details for that specific product.  
It also includes an interactive image gallery where clicking a thumbnail updates the main image.

**Code:**
```jsx
import { useParams } from 'react-router-dom';

const ProductDetailsPage = () => {
    const { productId } = useParams();
    const [mainImage, setMainImage] = useState('');

    useEffect(() => {
        const fetchProduct = async () => {
            const response = await fetch(
                `https://huitian.serv00.net/project/?productId=${productId}`
            );
            const data = await response.json();
            setProduct(data);
            if (data.imageUrls) setMainImage(data.imageUrls[0]);
        };
        fetchProduct();
    }, [productId]);

    {product.imageUrls.map((img) => (
        <div onClick={() => setMainImage(img)}>
            <img src={img} />
        </div>
    ))}
};
```

---

## Slide 9 — CartPage.jsx
### Speaker Notes:
The Cart Page reads all the user’s items from localStorage and displays them.  
Users can change quantities with the plus and minus buttons.  
The updates are written back to localStorage, and the UI updates right away.  
The total price is calculated by summing price × quantity.

**Code:**
```jsx
useEffect(() => {
    const cart = JSON.parse(localStorage.getItem('cart') || '{}');
    setCartItems(Object.values(cart));
}, []);
```

```jsx
const updateQuantity = (productId, change) => {
    const cart = JSON.parse(localStorage.getItem('cart') || '{}');
    if (cart[productId]) {
        cart[productId].quantity += change;
        if (cart[productId].quantity <= 0) delete cart[productId];
        localStorage.setItem('cart', JSON.stringify(cart));
        setCartItems(Object.values(cart));
    }
};
```

```jsx
const calculateTotal = () => {
    return cartItems.reduce((total, item) => {
        let price = parseFloat(item.price.replace(/[^0-9.-]+/g, ""));
        return total + price * item.quantity;
    }, 0);
};
```

---

## Slide 10 — Routing (App.jsx)
### Speaker Notes:
This component connects everything together.  
App.jsx manages routing with BrowserRouter and nested Routes.  
The Layout component ensures the Header and Footer always appear.  
Inside Layout, React Router loads the correct page for each path.

**Code:**
```jsx
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

---

## Slide 11 — Data Flow & Relationships
### Speaker Notes:
This shows how components interact.  
HomePage fetches data and passes each product into ProductCard.  
Adding to cart writes into localStorage.  
CartPage reads the same storage and updates it when quantities change.  
This creates a simple shared state without a backend database.

---

## Slide 12 — Demonstration Steps
### Speaker Notes:
I’ll now demonstrate how the app works from the user’s perspective:
1. Load products on the Home Page  
2. Add a product to the cart  
3. Open the Product Details Page  
4. Try the image gallery and add another item  
5. Open the Cart Page  
6. Adjust quantity and observe total updates  
7. Click Check Out to continue to my teammate’s page
