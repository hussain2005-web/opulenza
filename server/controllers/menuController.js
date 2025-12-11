const db = require('../db');

exports.getAllMenuItems = (req, res) => {
    db.all(`SELECT * FROM menu_items`, [], (err, rows) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.json(rows);
    });
};

exports.addMenuItem = (req, res) => {
    const { name, category, price, serving_size, serving_unit, description, is_available } = req.body;
    const query = `INSERT INTO menu_items (name, category, price, serving_size, serving_unit, description, is_available) VALUES (?, ?, ?, ?, ?, ?, ?)`;
    db.run(query, [name, category, price, serving_size, serving_unit, description, is_available], function (err) {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.status(201).json({ id: this.lastID, message: 'Item added' });
    });
};

exports.updateMenuItem = (req, res) => {
    const { id } = req.params;
    const { name, category, price, serving_size, serving_unit, description, is_available } = req.body;
    const query = `UPDATE menu_items SET name=?, category=?, price=?, serving_size=?, serving_unit=?, description=?, is_available=? WHERE id=?`;
    db.run(query, [name, category, price, serving_size, serving_unit, description, is_available, id], function (err) {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.json({ message: 'Item updated' });
    });
};

exports.deleteMenuItem = (req, res) => {
    const { id } = req.params;
    db.run(`DELETE FROM menu_items WHERE id=?`, [id], function (err) {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.json({ message: 'Item deleted' });
    });
};
