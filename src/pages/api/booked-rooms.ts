import type { NextApiRequest, NextApiResponse } from 'next';
import db from '@/lib/db';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    try {
      const query = `
        SELECT
          b.id,
          b.guest_id,
          b.room_id,
          b.check_in,
          b.check_out,
          b.total_price,
          b.status,
          g.first_name AS guest_name,
          r.room_number
        FROM
          bookings b
        JOIN
          guests g ON b.guest_id = g.id
        JOIN
          rooms r ON b.room_id = r.id
      `;
      const [rows] = await db.query(query) as any;
      res.status(200).json(rows);
    } catch (error) {
      console.error('Error fetching booked rooms:', error);
      res.status(500).json({ error: 'Failed to fetch booked rooms' });
    }
  } else {
    res.setHeader('Allow', ['GET']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
