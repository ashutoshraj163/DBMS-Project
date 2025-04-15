const path = require('path');
const db = require(path.join(__dirname, '..', 'lib', 'db')).default;

async function checkRooms() {
  try {
    const [rows] = await db.query('SELECT * FROM rooms');
    console.log('Rooms in database:', rows);
  } catch (error) {
    console.error('Error querying rooms:', error);
  } finally {
    process.exit(0);
  }
}

checkRooms();
