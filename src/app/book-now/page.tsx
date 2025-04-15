'use client';

import React, { useEffect, useState } from 'react';

interface Room {
  id: number;
  room_number: string;
  type: string;
  view: string | null;
  accessibility: boolean;
  price: number;
  status: string;
}

interface Guest {
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;
  specialRequests?: string;
}

export default function BookNow() {
  const [rooms, setRooms] = useState<Room[]>([]);
  const [selectedRoomId, setSelectedRoomId] = useState<number | null>(null);
  const [guest, setGuest] = useState<Guest>({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    specialRequests: '',
  });
  const [checkIn, setCheckIn] = useState('');
  const [checkOut, setCheckOut] = useState('');
  const [message, setMessage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    async function fetchRooms() {
      try {
        const res = await fetch('/api/rooms');
        let data = await res.json();
        // Ensure data is an array, if not, initialize to empty array
        if (!Array.isArray(data)) {
          data = [];
        }
        setRooms(data);
      } catch (err) {
        setError('Failed to load rooms');
      }
    }

    setIsClient(true);

    // Fetch rooms only on the client-side after marking as client
    fetchRooms();
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setGuest(prev => ({ ...prev, [name]: value }));
  };

  const handleBooking = async () => {
    setMessage(null);
    setError(null);
    if (!selectedRoomId || !checkIn || !checkOut || !guest.firstName || !guest.lastName || !guest.email) {
      setError('Please fill in all required fields');
      return;
    }
    try {
      const res = await fetch('/api/bookings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ guest, roomId: selectedRoomId, checkIn, checkOut }),
      });
      const data = await res.json();
      if (res.ok) {
        setMessage('Booking successful! Your booking ID is ' + data.bookingId);
        // Reset form
        setSelectedRoomId(null);
        setGuest({ firstName: '', lastName: '', email: '', phone: '', specialRequests: '' });
        setCheckIn('');
        setCheckOut('');
      } else {
        setError(data.error || 'Booking failed');
      }
    } catch (err) {
      setError('Booking failed');
    }
  };

  return (
    <div className="container mx-auto py-12 max-w-4xl">
      <h1 className="text-3xl font-bold text-center mb-8">Book Your Stay</h1>

      {error && <div className="mb-4 text-red-600 font-semibold">{error}</div>}
      {message && <div className="mb-4 text-green-600 font-semibold">{message}</div>}

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">Available Rooms</h2>
        {rooms && rooms.length === 0 ? (
          <p>No rooms available at the moment.</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {rooms && Array.isArray(rooms) && rooms.map(room => (
              <div
                key={room.id}
                className={`border rounded-lg p-4 cursor-pointer ${
                  selectedRoomId === room.id ? 'border-blue-500 bg-blue-50' : 'border-gray-300'
                }`}
                onClick={() => setSelectedRoomId(room.id)}
              >
                <h3 className="text-xl font-bold">{room.type} Room</h3>
                <p>Room Number: {room.room_number}</p>
                <p>View: {room.view || 'N/A'}</p>
                <p>Accessibility: {room.accessibility ? 'Yes' : 'No'}</p>
                <p>Price per night: ${room.price.toFixed(2)}</p>
              </div>
            ))}
          </div>
        )}
      </section>

      {isClient && (
        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">Guest Information</h2>
          <form
            onSubmit={e => {
              e.preventDefault();
              handleBooking();
            }}
            className="space-y-4"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <input
                type="text"
                name="firstName"
                placeholder="First Name *"
                value={guest.firstName}
                onChange={handleInputChange}
                className="border p-2 rounded w-full"
                required
              />
              <input
                type="text"
                name="lastName"
                placeholder="Last Name *"
                value={guest.lastName}
                onChange={handleInputChange}
                className="border p-2 rounded w-full"
                required
              />
            </div>
            <input
              type="email"
              name="email"
              placeholder="Email *"
              value={guest.email}
              onChange={handleInputChange}
              className="border p-2 rounded w-full"
              required
            />
            <input
              type="tel"
              name="phone"
              placeholder="Phone"
              value={guest.phone}
              onChange={handleInputChange}
              className="border p-2 rounded w-full"
            />
            <textarea
              name="specialRequests"
              placeholder="Special Requests"
              value={guest.specialRequests}
              onChange={handleInputChange}
              className="border p-2 rounded w-full"
            />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <label>
                Check-In Date *
                <input
                  type="date"
                  value={checkIn}
                  onChange={e => setCheckIn(e.target.value)}
                  className="border p-2 rounded w-full"
                  required
                />
              </label>
              <label>
                Check-Out Date *
                <input
                  type="date"
                  value={checkOut}
                  onChange={e => setCheckOut(e.target.value)}
                  className="border p-2 rounded w-full"
                  required
                />
              </label>
            </div>
            <button
              type="submit"
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            >
              Book Now
            </button>
          </form>
        </section>
      )}
    </div>
  );
}
