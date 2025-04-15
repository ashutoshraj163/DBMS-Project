-- Create the 'rooms' table
CREATE TABLE IF NOT EXISTS rooms (
  id INT AUTO_INCREMENT PRIMARY KEY,
  room_number VARCHAR(255) NOT NULL UNIQUE,
  type VARCHAR(255) NOT NULL,
  view VARCHAR(255),
  accessibility BOOLEAN NOT NULL DEFAULT FALSE,
  price DECIMAL(10, 2) NOT NULL,
  status ENUM('available', 'occupied', 'maintenance') NOT NULL DEFAULT 'available'
);

-- Create the 'guests' table
CREATE TABLE IF NOT EXISTS guests (
  id INT AUTO_INCREMENT PRIMARY KEY,
  first_name VARCHAR(255) NOT NULL,
  last_name VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL UNIQUE,
  phone VARCHAR(20),
  special_requests TEXT
);

-- Create the 'bookings' table
CREATE TABLE IF NOT EXISTS bookings (
  id INT AUTO_INCREMENT PRIMARY KEY,
  guest_id INT NOT NULL,
  room_id INT NOT NULL,
  check_in DATE NOT NULL,
  check_out DATE NOT NULL,
  total_price DECIMAL(10, 2) NOT NULL,
  status ENUM('booked', 'checked_in', 'checked_out', 'cancelled') NOT NULL DEFAULT 'booked',
  FOREIGN KEY (guest_id) REFERENCES guests(id),
  FOREIGN KEY (room_id) REFERENCES rooms(id)
);
