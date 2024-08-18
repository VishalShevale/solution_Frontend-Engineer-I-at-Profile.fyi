import React, { useState, useEffect } from 'react';

export default function CartItem({ item, handleIncrement, handleDecrement, removeFromCart }) {
  // Local state for tracking the quantity of the current cart item
  const [quantity, setQuantity] = useState(item.quantity);

  useEffect(() => {
    // Sync the quantity in the input field with the global cart state (item.quantity)
    setQuantity(item.quantity);
  }, [item.quantity]);  // This effect runs whenever `item.quantity` changes

  // Handle change in the input field
  const handleChange = (e) => {
    const newQuantity = parseInt(e.target.value, 10);  // Convert the input value to an integer
    if (!isNaN(newQuantity) && newQuantity > 0) {
      setQuantity(newQuantity);  // Update the local quantity state if valid input
    } else {
      setQuantity(1);  // If invalid input, default to a quantity of 1
    }
  };

  // Handle blur event (when the input field loses focus)
  const handleBlur = () => {
    handleIncrement(item.id, quantity - 1);  // Sync the updated quantity to the global state
  };

  return (
    <div className="flex items-center justify-between p-4 border-b">
      {/* Display the product image */}
      <img src={item.image} alt={item.name} className="w-16 h-16 object-contain" />
      
      {/* Display the product name */}
      <p>{item.name}</p>
      
      {/* Display the product price */}
      <p>${item.price.toFixed(2)}</p>
      
      <div className="flex items-center space-x-2">
        {/* Decrement button */}
        <button
          onClick={() => {
            const newQuantity = Math.max(quantity, 1);  // Ensure quantity doesn't go below 1
            setQuantity(newQuantity);  // Update the local quantity state
            handleDecrement(item.id, newQuantity);  // Sync the new quantity to the global state
          }}
          className="w-8 h-8 flex items-center justify-center border border-gray-300 rounded-full text-lg"
        >
          -
        </button>

        {/* Quantity input field */}
        <input
          id="input_quantity"
          type="number"
          value={quantity}  // Controlled input bound to local state
          onChange={handleChange}  // Handle changes to input value
          onBlur={handleBlur}  // Handle the blur event to sync with global state
          className="w-12 text-center border border-gray-300 rounded [-moz-appearance:_textfield] [&::-webkit-inner-spin-button]:m-0 [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:m-0 [&::-webkit-outer-spin-button]:appearance-none"
        />

        {/* Increment button */}
        <button
          onClick={() => {
            const newQuantity = quantity;  // Increment the quantity
            setQuantity(newQuantity);  // Update the local quantity state
            handleIncrement(item.id, newQuantity);  // Sync the new quantity to the global state
          }}
          className="w-8 h-8 flex items-center justify-center border border-gray-300 rounded-full text-lg"
        >
          +
        </button>
      </div>

      {/* Remove item from cart button */}
      <button
        onClick={() => removeFromCart(item.id)}  // Trigger the remove function when clicked
        className="text-red-500 hover:text-red-700 transition"
      >
        Remove
      </button>
    </div>
  );
}
