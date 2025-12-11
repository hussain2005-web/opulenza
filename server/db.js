const sqlite3 = require('sqlite3').verbose();
const path = require('path');
const fs = require('fs');

const dbPath = path.resolve(__dirname, 'database.sqlite');
const db = new sqlite3.Database(dbPath, (err) => {
    if (err) {
        console.error('Error opening database ' + dbPath + ': ' + err.message);
    } else {
        console.log('Connected to the SQLite database.');
        initDb();
    }
});

function initDb() {
    db.serialize(() => {
        // Users & Roles
        db.run(`CREATE TABLE IF NOT EXISTS users (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            username TEXT UNIQUE,
            password TEXT,
            role TEXT, -- 'admin', 'customer', 'waiter', 'kitchen', 'reception', 'cashier'
            name TEXT
        )`);

        // Menu Items
        db.run(`CREATE TABLE IF NOT EXISTS menu_items (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name TEXT,
            category TEXT, -- 'main', 'dry', 'dessert', 'drinks', 'roti', 'rice'
            price REAL,
            serving_size TEXT, -- e.g., '200g', '250ml'
            serving_unit TEXT, -- 'g', 'ml'
            description TEXT,
            is_available INTEGER DEFAULT 1 -- 1 for yes, 0 for no
        )`);

        // Restaurant Tables
        db.run(`CREATE TABLE IF NOT EXISTS restaurant_tables (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            table_number INTEGER UNIQUE,
            capacity INTEGER,
            status TEXT DEFAULT 'free', -- 'free', 'occupied'
            current_order_id INTEGER
        )`);

        // Orders
        db.run(`CREATE TABLE IF NOT EXISTS orders (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            table_id INTEGER,
            user_id INTEGER, -- if linked to a customer
            status TEXT DEFAULT 'pending', -- 'pending', 'sent_to_kitchen', 'served', 'paid'
            created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
            FOREIGN KEY(table_id) REFERENCES restaurant_tables(id)
        )`);

        // Order Items
        db.run(`CREATE TABLE IF NOT EXISTS order_items (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            order_id INTEGER,
            menu_item_id INTEGER,
            quantity INTEGER,
            price_at_time REAL,
            FOREIGN KEY(order_id) REFERENCES orders(id),
            FOREIGN KEY(menu_item_id) REFERENCES menu_items(id)
        )`);

        // Rooms
        db.run(`CREATE TABLE IF NOT EXISTS rooms (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            room_number TEXT UNIQUE,
            type TEXT, -- 'single', 'double', 'suite'
            price_per_night REAL,
            occupancy INTEGER,
            status TEXT DEFAULT 'available' -- 'available', 'occupied', 'cleaning'
        )`);

        // Room Bookings
        db.run(`CREATE TABLE IF NOT EXISTS room_bookings (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            room_id INTEGER,
            customer_id INTEGER,
            check_in_date DATE,
            check_out_date DATE,
            status TEXT DEFAULT 'active', -- 'active', 'completed', 'cancelled'
            FOREIGN KEY(room_id) REFERENCES rooms(id),
            FOREIGN KEY(customer_id) REFERENCES users(id)
        )`);

        // Bills
        db.run(`CREATE TABLE IF NOT EXISTS bills (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            bill_type TEXT, -- 'restaurant', 'motel', 'mixed'
            reference_ids TEXT, -- comma separated order_ids or booking_ids
            total_amount REAL,
            tax_amount REAL,
            grand_total REAL,
            status TEXT DEFAULT 'unpaid', -- 'unpaid', 'paid'
            created_at DATETIME DEFAULT CURRENT_TIMESTAMP
        )`);

        // Initial Seed Data if empty
        db.get("SELECT count(*) as count FROM users", (err, row) => {
            if (row.count === 0) {
                console.log("Seeding initial data...");
                // Admin user (password: admin123) - In real app, hash this! We will hash in auth controller, but for seed we might need pre-hashed or handle it.
                // For simplicity in seed, let's assume we use bcrypt in code. 
                // I'll leave seeding to a separate specialized script or just let the user register/create admin via a special route or ensure admin exists on start.
                // Or I can insert a raw record if I know the hash.
                // admin123 hash: $2a$10$X7... (generated via bcrypt)
                // Let's just create a quick seed function for admin
            }
        });
    });
}

module.exports = db;
