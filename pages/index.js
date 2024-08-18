import { useCart } from '../contexts/CartContext';  // Importing the cart context for cart operations
import { useState, useEffect } from 'react';  // Importing React hooks
import ProductCard from '../components/ProductCard';  // Importing the ProductCard component
import Pagination from '../components/Pagination';  // Importing the Pagination component
import Header from '../components/Header';  // Importing the Header component

export default function Home() {
  const { addToCart, cart } = useCart();  // Destructuring functions and state from CartContext
  const [products, setProducts] = useState([]);  // Local state to hold the products
  const [addedProductIds, setAddedProductIds] = useState([]);  // Local state to track added products
  const [currentPage, setCurrentPage] = useState(1);  // Local state for the current page
  const pageSize = 10;  // Number of products per page

  // Fetch products data on component mount
  useEffect(() => {
    fetch('/products.json')  // Fetching products from the local JSON file
      .then((response) => response.json())  // Parsing the response to JSON
      .then((data) => setProducts(data));  // Setting the products state with fetched data
  }, []);  // Empty dependency array ensures this effect runs only once when the component mounts

  // Handle adding a product to the cart
  const handleAddToCart = (product) => {
    addToCart(product);  // Add the product to the cart
    setAddedProductIds((prev) => [...prev, product.id]);  // Track the added product ID
  };

  // Calculate indices for the current page's products
  const indexOfLastProduct = currentPage * pageSize;  // Index of the last product on the current page
  const indexOfFirstProduct = indexOfLastProduct - pageSize;  // Index of the first product on the current page
  const currentProducts = products.slice(indexOfFirstProduct, indexOfLastProduct);  // Slice products array to get current page's products

  // Calculate total number of pages
  const totalPages = Math.ceil(products.length / pageSize);  // Total pages based on products length and page size

  return (
    <div className="container mx-auto p-6">
      <Header cartCount={cart.length} />  {/* Render the header with cart count */}

      {/* Render products in a responsive grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
        {currentProducts.map((product) => (
          <ProductCard
            key={product.id}  // Unique key for each product
            product={product}  // Passing product data to ProductCard
            addToCart={handleAddToCart}  // Passing handleAddToCart function to ProductCard
            addedToCart={addedProductIds.includes(product.id)}  // Check if the product has been added to cart
          />
        ))}
      </div>

      {/* Render pagination controls */}
      <Pagination
        currentPage={currentPage}  // Pass current page to Pagination
        totalPages={totalPages}  // Pass total number of pages to Pagination
        onPageChange={setCurrentPage}  // Function to handle page change
      />
    </div>
  );
}
