import db from '../lib/db';

async function checkRooms() {
  try {
    const [rows] = await db.query('SELECT * FROM rooms') as any[];
    console.log('Rooms in database:', rows);
  } catch (error) {
    console.error('Error querying rooms:', error);
  } finally {
    process.exit(0);
  }
}

checkRooms();
