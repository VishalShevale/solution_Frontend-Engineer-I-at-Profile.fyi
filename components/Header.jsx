import Link from 'next/link';

export default function Header({ cartCount }) {
  return (
    <header className="flex justify-between items-center mb-6">
      <h1 className="text-3xl font-bold">Smartwatches</h1>
      {/* Cart link displays the current number of items in the cart */}
      <Link href="/cart" className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600">
        {/* Dynamically show the cart count */}
        Cart ({cartCount})
      </Link>
    </header>
  );
}
