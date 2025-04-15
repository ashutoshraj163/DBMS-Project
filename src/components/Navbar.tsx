'use client';

import Link from 'next/link';
import React from 'react';

export default function Navbar() {
  return (
    <nav className="bg-gray-900 bg-opacity-80 text-white px-6 py-4 flex justify-between items-center fixed top-0 left-0 right-0 z-50">
      <div className="text-xl font-bold">
        <Link href="/">Hotel Management</Link>
      </div>
      <div className="space-x-4">
        <Link href="/" className="hover:underline">Home</Link>
        <Link href="/book-now" className="hover:underline">Book Now</Link>
        <Link href="/booked-rooms" className="hover:underline">Booked Rooms</Link>
        <Link href="/guests" className="hover:underline">Guests</Link>
        <Link href="/reviews" className="hover:underline">Reviews</Link>
        <Link href="/settings" className="hover:underline">Settings</Link>
      </div>
    </nav>
  );
}
