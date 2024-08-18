export default function ProductCard({ product, addToCart, addedToCart }) {
  // Calculate discount percentage if original price exists
  const discountPercentage = product.originalPrice
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : 0;  // No discount if no original price

  return (
    <div className="border rounded-lg p-4 shadow-lg hover:shadow-2xl transform hover:scale-105 transition duration-300 flex flex-col items-center">
      {/* Product Image */}
      <img src={product.image} alt={product.name} className="w-full h-40 mb-4 object-contain" />
      
      {/* Product Name */}
      <h2 className="text-lg font-semibold mb-2">{product.name}</h2>
      
      {/* Price Section */}
      <div className="flex items-baseline space-x-2">
        {/* Display current price */}
        <p className="text-2xl font-bold">₹{product.price.toLocaleString('en-IN')}</p>

        {/* If there is an original price, display the original price and discount percentage */}
        {product.originalPrice && (
          <>
            <p className="text-sm text-gray-500 line-through">₹{product.originalPrice.toLocaleString('en-IN')}</p>
            <p className="text-sm text-green-600 font-semibold">{discountPercentage}% off</p>
          </>
        )}
      </div>

      {/* Add to Cart Button */}
      <button
        className={`mt-4 py-2 px-4 rounded text-white transition duration-200 transform ${
          addedToCart ? 'bg-green-500 animate-pulse' : 'bg-blue-500 hover:bg-blue-600'
        }`}  // Button style changes if the product is added to the cart
        onClick={() => addToCart(product)}  // Calls addToCart function when clicked
        disabled={addedToCart}  // Disables button if already added to cart
      >
        {/* Change button text based on cart state */}
        {addedToCart ? 'Added to Cart' : 'Add to Cart'}
      </button>
    </div>
  );
}
