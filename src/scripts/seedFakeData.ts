const fs = require('fs');
const path = require('path');
const db = require('../lib/db').default;
const { faker } = require('@faker-js/faker');

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
    for (let i = 0; i < 10; i++) {
      const room = {
        room_number: faker.string.alphanumeric({ length: 3 }),
        type: faker.helpers.arrayElement(['Standard', 'Deluxe', 'Suite']),
        view: faker.helpers.arrayElement(['City', 'Sea', 'Garden', null]),
        accessibility: faker.datatype.boolean(),
        price: faker.number.float({ min: 80, max: 300, precision: 2 }),
        status: faker.helpers.arrayElement(['available', 'occupied', 'maintenance']),
      };

      await db.query(
        'INSERT INTO rooms (room_number, type, view, accessibility, price, status) VALUES (?, ?, ?, ?, ?, ?) ON DUPLICATE KEY UPDATE room_number=room_number',
        [room.room_number, room.type, room.view, room.accessibility, room.price, room.status]
      );
    }

    // Insert guests
    for (let i = 0; i < 10; i++) {
      const guest = {
        first_name: faker.person.firstName(),
        last_name: faker.person.lastName(),
        email: faker.internet.email(),
        phone: faker.phone.number(),
        special_requests: faker.lorem.sentence(),
      };

      await db.query(
        'INSERT INTO guests (first_name, last_name, email, phone, special_requests) VALUES (?, ?, ?, ?, ?) ON DUPLICATE KEY UPDATE email=email',
        [guest.first_name, guest.last_name, guest.email, guest.phone, guest.special_requests]
      );
    }

    // Insert bookings
    const [guestRows]: any[] = await db.query('SELECT id FROM guests');
    const [roomRows]: any[] = await db.query('SELECT id FROM rooms');

    if (guestRows.length > 0 && roomRows.length > 0) {
      for (let i = 0; i < 10; i++) {
        const booking = {
          guest_id: faker.helpers.arrayElement(guestRows).id,
          room_id: faker.helpers.arrayElement(roomRows).id,
          check_in: faker.date.future().toISOString().slice(0, 10),
          check_out: faker.date.future().toISOString().slice(0, 10),
          status: faker.helpers.arrayElement(['booked', 'checked_in', 'checked_out', 'cancelled']),
          total_price: faker.number.float({ min: 100, max: 1000, precision: 2 }),
        };

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
