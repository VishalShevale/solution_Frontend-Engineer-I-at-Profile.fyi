import { useCart } from '../contexts/CartContext';  // Importing the cart context
import { useState, useEffect } from 'react';  // Importing React hooks
import CartItem from '../components/CartItem';  // Importing the CartItem component
import Link from 'next/link';

export default function Cart() {
  const { cart, updateQuantity, removeFromCart } = useCart();  // Accessing cart data and functions from the CartContext
  const [subtotal, setSubtotal] = useState(0);  // Local state for tracking the subtotal
  const [isAnimating, setIsAnimating] = useState(false);  // Local state to handle animation effect for subtotal update

  // useEffect to calculate the subtotal whenever the cart changes
  useEffect(() => {
    // Calculate the new subtotal by summing the price of each item times its quantity
    const newSubtotal = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);
    
    // Trigger the animation when the subtotal changes
    setIsAnimating(true);
    setTimeout(() => setIsAnimating(false), 300);  // Remove the animation effect after 300ms

    // Update the subtotal in the state
    setSubtotal(newSubtotal);
  }, [cart]);  // Dependency array includes 'cart', so the effect runs whenever the cart is updated

  // Handle incrementing the quantity of an item in the cart
  const handleIncrement = (id, quantity) => {
    updateQuantity(id, quantity + 1);  // Update the cart with the new quantity (incremented by 1)
  };

  // Handle decrementing the quantity of an item in the cart
  const handleDecrement = (id, quantity) => {
    updateQuantity(id, Math.max(quantity - 1, 1));  // Update the cart with the new quantity (decremented by 1), ensuring the minimum quantity is 1
  };

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Shopping Cart</h1>
      
      {/* Check if the cart is empty */}
      {cart.length === 0 ? (
        <p>Your cart is empty.</p>,
        <Link href="/" className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600">
        Add items in cart
        </Link>
        
      ) : (
        <div>
          {/* Cart Header */}
          <div className="grid grid-cols-6 font-semibold text-gray-700 border-b pb-2 mb-4">
            <span className="col-span-1 text-center pl-2">Image</span>
            <span className="col-span-2 text-center">Product Name</span>
            <span className="col-span-1 text-center">Price</span>
            <span className="col-span-1 text-center">Quantity</span>
          </div>

          {/* Render Cart Items */}
          {cart.map((item) => (
            <CartItem
              key={item.id}  // Unique key for each item in the cart
              item={item}  // Pass the item details to CartItem
              handleIncrement={handleIncrement}  // Function to handle incrementing the item's quantity
              handleDecrement={handleDecrement}  // Function to handle decrementing the item's quantity
              removeFromCart={removeFromCart}  // Function to remove the item from the cart
            />
          ))}

          {/* Display Subtotal */}
          <div className="mt-6">
            <h2 className="text-xl font-bold">
              Subtotal:
              <span className={`text-green-600 ml-2 transition-transform duration-300 ease-out transform ${isAnimating ? "scale-110" : ""}`}>
                ${subtotal.toFixed(2)}  {/* Display the subtotal with two decimal places */}
              </span>
            </h2>
          </div>
        </div>
      )}
    </div>
  );
}
