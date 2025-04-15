import type { NextApiRequest, NextApiResponse } from 'next';
import db from '@/lib/db';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    const { guest, roomId, checkIn, checkOut } = req.body;

    if (!guest || !roomId || !checkIn || !checkOut) {
      return res.status(400).json({ error: 'Missing required booking information' });
    }

    try {
      // Start transaction
      const connection = await db.getConnection();
      await connection.beginTransaction();

      // Check if guest exists by email
      let [existingGuests] = await connection.query(
        'SELECT id FROM guests WHERE email = ?',
        [guest.email]
      ) as any[];
      let guestId;
      if (Array.isArray(existingGuests) && existingGuests.length > 0) {
        guestId = existingGuests[0].id;
      } else {
        // Insert new guest
        const [result] = await connection.query(
          'INSERT INTO guests (first_name, last_name, email, phone, special_requests) VALUES (?, ?, ?, ?, ?)',
          [guest.firstName, guest.lastName, guest.email, guest.phone, guest.specialRequests || null]
        ) as any;
        guestId = result.insertId;
      }

      // Get room price
      const [rooms] = await connection.query(
        'SELECT price FROM rooms WHERE id = ? AND status = "available"',
        [roomId]
      ) as any[];
      if (!Array.isArray(rooms) || rooms.length === 0) {
        await connection.rollback();
        connection.release();
        return res.status(400).json({ error: 'Room not available' });
      }
      const price = rooms[0].price;

      // Calculate total price (simple example: price * number of nights)
      const checkInDate = new Date(checkIn);
      const checkOutDate = new Date(checkOut);
      const timeDiff = checkOutDate.getTime() - checkInDate.getTime();
      const nights = Math.ceil(timeDiff / (1000 * 3600 * 24));
      const totalPrice = price * nights;

      // Insert booking
      const [bookingResult] = await connection.query(
        'INSERT INTO bookings (guest_id, room_id, check_in, check_out, total_price) VALUES (?, ?, ?, ?, ?)',
        [guestId, roomId, checkIn, checkOut, totalPrice]
      ) as any;

      // Update room status to occupied
      await connection.query(
        'UPDATE rooms SET status = "occupied" WHERE id = ?',
        [roomId]
      );

      await connection.commit();
      connection.release();

      res.status(201).json({ message: 'Booking created successfully', bookingId: bookingResult.insertId });
    } catch (error) {
      console.error('Error creating booking:', error);
      res.status(500).json({ error: 'Failed to create booking' });
    }
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
