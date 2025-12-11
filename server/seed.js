const db = require('./db');
const bcrypt = require('bcryptjs');

function seed() {
    console.log("Seeding database...");

    // Create Admin
    const adminPass = bcrypt.hashSync('admin123', 8);
    db.run(`INSERT OR IGNORE INTO users (username, password, name, role) VALUES ('admin', '${adminPass}', 'Admin User', 'admin')`, (err) => {
        if (!err) console.log("Admin seeded (or already exists).");
    });

    // Create Waiter
    const waiterPass = bcrypt.hashSync('waiter123', 8);
    db.run(`INSERT OR IGNORE INTO users (username, password, name, role) VALUES ('waiter', '${waiterPass}', 'John Waiter', 'waiter')`, (err) => {
        if (!err) console.log("Waiter seeded.");
    });

    // Create Receptionist
    const receptionPass = bcrypt.hashSync('reception123', 8);
    db.run(`INSERT OR IGNORE INTO users (username, password, name, role) VALUES ('reception', '${receptionPass}', 'Alice Reception', 'reception')`, (err) => {
        if (!err) console.log("Receptionist seeded.");
    });

    // Create Cashier
    const cashierPass = bcrypt.hashSync('cashier123', 8);
    db.run(`INSERT OR IGNORE INTO users (username, password, name, role) VALUES ('cashier', '${cashierPass}', 'Bob Cashier', 'cashier')`, (err) => {
        if (!err) console.log("Cashier seeded.");
    });

    // Create Customer
    const customerPass = bcrypt.hashSync('customer123', 8);
    db.run(`INSERT OR IGNORE INTO users (username, password, name, role) VALUES ('customer', '${customerPass}', 'Charlie Customer', 'customer')`, (err) => {
        if (!err) console.log("Customer seeded.");
    });

    // Seed Menu Items
    const menuItems = [
        ['Grilled Chicken', 'main', 15.00, '300g', 'g', 'Delicious grilled chicken with herbs', 1],
        ['Caesar Salad', 'main', 10.00, '200g', 'g', 'Fresh salad with crisp romaine and croutons', 1],
        ['French Fries', 'dry', 5.00, '150g', 'g', 'Crispy golden fries', 1],
        ['Chocolate Cake', 'dessert', 6.00, '120g', 'g', 'Rich chocolate layer cake', 1],
        ['Coke', 'drinks', 2.00, '330ml', 'ml', 'Chilled cola', 1],
        ['Water', 'drinks', 1.00, '500ml', 'ml', 'Mineral water', 1],
        ['Naan', 'roti', 2.00, '100g', 'g', 'Buttery naan bread', 1],
        ['Fried Rice', 'rice', 8.00, '250g', 'g', 'Vegetable fried rice', 1]
    ];

    menuItems.forEach(item => {
        db.run(`INSERT INTO menu_items (name, category, price, serving_size, serving_unit, description, is_available) VALUES (?, ?, ?, ?, ?, ?, ?)`, item, (err) => {
            // ignore error
        });
    });
    console.log("Menu items seeded.");

    // Seed Tables
    for (let i = 1; i <= 10; i++) {
        db.run(`INSERT OR IGNORE INTO restaurant_tables (table_number, capacity) VALUES (${i}, 4)`);
    }
    console.log("Tables seeded.");

    // Seed Rooms
    const rooms = [
        ['101', 'single', 50.00, 1],
        ['102', 'single', 50.00, 1],
        ['201', 'double', 80.00, 2],
        ['202', 'double', 80.00, 2],
        ['301', 'suite', 150.00, 4]
    ];
    rooms.forEach(room => {
        db.run(`INSERT OR IGNORE INTO rooms (room_number, type, price_per_night, occupancy) VALUES (?, ?, ?, ?)`, room);
    });
    console.log("Rooms seeded.");
}

setTimeout(seed, 1000); // Wait for DB init
