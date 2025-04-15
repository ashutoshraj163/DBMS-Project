import type { NextApiRequest, NextApiResponse } from 'next';
import db from '@/lib/db';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    const { firstName, lastName, email, phone, specialRequests } = req.body;

    if (!firstName || !lastName || !email) {
      return res.status(400).json({ error: 'Missing required guest information' });
    }

    try {
      // Check if guest exists by email
      const [existingGuests] = await db.query(
        'SELECT id FROM guests WHERE email = ?',
        [email]
      ) as any[];

      if (existingGuests.length > 0) {
        // Update guest info
        await db.query(
          'UPDATE guests SET first_name = ?, last_name = ?, phone = ?, special_requests = ? WHERE email = ?',
          [firstName, lastName, phone, specialRequests || null, email]
        );
        return res.status(200).json({ message: 'Guest updated successfully' });
      } else {
        // Insert new guest
        const [result] = await db.query(
          'INSERT INTO guests (first_name, last_name, email, phone, special_requests) VALUES (?, ?, ?, ?, ?)',
          [firstName, lastName, email, phone, specialRequests || null]
        ) as any;
        return res.status(201).json({ message: 'Guest created successfully', guestId: result.insertId });
      }
    } catch (error) {
      console.error('Error managing guest:', error);
      res.status(500).json({ error: 'Failed to manage guest' });
    }
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
