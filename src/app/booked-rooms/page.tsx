'use client';

import React, {useEffect, useState} from 'react';

interface Booking {
  id: number;
  guest_id: number;
  room_id: number;
  check_in: string;
  check_out: string;
  total_price: number;
  status: string;
  guest_name: string; // Added field
  room_number: string; // Added field
}

export default function BookedRoomsPage() {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchBookings() {
      try {
        const res = await fetch('/api/booked-rooms');
        if (!res.ok) {
          throw new Error(`HTTP error! status: ${res.status}`);
        }
        const data = await res.json();
        setBookings(data);
      } catch (e: any) {
        setError('Failed to load bookings: ' + e.message);
      }
    }

    fetchBookings();
  }, []);

  return (
    <div className="container mx-auto py-12 max-w-4xl">
      <h1 className="text-3xl font-bold text-center mb-8">Booked Rooms</h1>

      {error && <div className="mb-4 text-red-600 font-semibold">{error}</div>}

      {bookings.length === 0 ? (
        <p>No rooms are currently booked.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full border border-gray-200 divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Booking ID
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Guest Name
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Room Number
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Check-In Date
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Check-Out Date
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Total Price
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {bookings.map(booking => (
                <tr key={booking.id}>
                  <td className="px-6 py-4 whitespace-nowrap">{booking.id}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{booking.guest_name}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{booking.room_number}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{booking.check_in}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{booking.check_out}</td>
                  <td className="px-6 py-4 whitespace-nowrap">${booking.total_price.toFixed(2)}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{booking.status}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
'