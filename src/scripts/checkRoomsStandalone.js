const mysql = require('mysql2/promise');

async function checkRooms() {
  const pool = mysql.createPool({
    host: process.env.MYSQL_HOST || 'localhost',
    user: process.env.MYSQL_USER || 'root',
    password: process.env.MYSQL_PASSWORD || '',
    database: process.env.MYSQL_DATABASE || 'hotel_management',
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0,
  });

  try {
    const [rows] = await pool.query('SELECT * FROM rooms');
    console.log('Rooms in database:', rows);
  } catch (error) {
    console.error('Error querying rooms:', error);
  } finally {
    await pool.end();
    process.exit(0);
  }
}

checkRooms();
