const fs = require('fs');
const path = require('path');
const db = require('../lib/db').default;

async function executeSchema() {
  const schemaPath = path.join(__dirname, '..', 'lib', 'schema.sql');
  const schema = fs.readFileSync(schemaPath, 'utf-8');
  const statements = schema.split(/;\s*$/m).filter(Boolean);

  for (const statement of statements) {
    try {
      await db.query(statement);
    } catch (error) {
      console.error('Error executing statement:', statement);
      console.error(error);
    }
  }
}

async function seedData() {
  try {
    // Insert rooms
    const rooms = [
      { room_number: '101', type: 'Standard', view: 'City', accessibility: false, price: 100.00, status: 'available' },
      { room_number: '102', type: 'Deluxe', view: 'Sea', accessibility: true, price: 150.00, status: 'available' },
      { room_number: '103', type: 'Suite', view: 'Garden', accessibility: false, price: 250.00, status: 'maintenance' },
    ];

    for (const room of rooms) {
      await db.query(
        'INSERT INTO rooms (room_number, type, view, accessibility, price, status) VALUES (?, ?, ?, ?, ?, ?) ON DUPLICATE KEY UPDATE room_number=room_number',
        [room.room_number, room.type, room.view, room.accessibility, room.price, room.status]
      );
    }

    // Insert guests
    const guests = [
      { first_name: 'John', last_name: 'Doe', email: 'john.doe@example.com', phone: '1234567890', special_requests: 'None' },
      { first_name: 'Jane', last_name: 'Smith', email: 'jane.smith@example.com', phone: '0987654321', special_requests: 'Late check-in' },
    ];

    for (const guest of guests) {
      await db.query(
        'INSERT INTO guests (first_name, last_name, email, phone, special_requests) VALUES (?, ?, ?, ?, ?) ON DUPLICATE KEY UPDATE email=email',
        [guest.first_name, guest.last_name, guest.email, guest.phone, guest.special_requests]
      );
    }

    // Insert bookings
    // For simplicity, link guest_id and room_id by selecting from inserted data
    const [guestRows]: any[] = await db.query('SELECT id FROM guests');
    const [roomRows]: any[] = await db.query('SELECT id FROM rooms');

    if (guestRows.length > 0 && roomRows.length > 0) {
      const bookings = [
        {
          guest_id: guestRows[0].id,
          room_id: roomRows[0].id,
          check_in: '2024-07-01',
          check_out: '2024-07-05',
          status: 'booked',
          total_price: 400.00,
        },
        {
          guest_id: guestRows[1].id,
          room_id: roomRows[1].id,
          check_in: '2024-07-10',
          check_out: '2024-07-15',
          status: 'checked_in',
          total_price: 750.00,
        },
      ];

      for (const booking of bookings) {
        await db.query(
          'INSERT INTO bookings (guest_id, room_id, check_in, check_out, status, total_price) VALUES (?, ?, ?, ?, ?, ?)',
          [booking.guest_id, booking.room_id, booking.check_in, booking.check_out, booking.status, booking.total_price]
        );
      }
    }

    console.log('Fake data seeded successfully.');
  } catch (error) {
    console.error('Error seeding data:', error);
  }
}

async function main() {
  await executeSchema();
  await seedData();
  process.exit(0);
}

main();
