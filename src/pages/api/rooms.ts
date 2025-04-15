import type { NextApiRequest, NextApiResponse } from 'next';
import db from '@/lib/db';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    try {
      // Fetch available rooms
      const [rows] = await db.query(
        "SELECT id, room_number, type, view, accessibility, price, status FROM rooms WHERE status = 'available'"
      );
      res.status(200).json(rows);
    } catch (error) {
      console.error('Error fetching rooms:', error);
      res.status(500).json({ error: 'Failed to fetch rooms' });
    }
  } else {
    res.setHeader('Allow', ['GET']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
