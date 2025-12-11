const db = require('../db');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const SECRET_KEY = process.env.JWT_SECRET || 'secret_key_123';

exports.register = (req, res) => {
    // Ideally only Admin can register staff.
    // Public can register as 'customer'.
    const { username, password, name, role } = req.body;

    // Default role is customer if not specified, but we should restrict high privilege roles
    const userRole = role || 'customer';

    const hashedPassword = bcrypt.hashSync(password, 8);

    const query = `INSERT INTO users (username, password, name, role) VALUES (?, ?, ?, ?)`;
    db.run(query, [username, hashedPassword, name, userRole], function (err) {
        if (err) {
            return res.status(500).json({ message: 'Error registering user', error: err.message });
        }
        res.status(201).json({ message: 'User registered successfully', userId: this.lastID });
    });
};

exports.login = (req, res) => {
    const { username, password } = req.body;

    db.get(`SELECT * FROM users WHERE username = ?`, [username], (err, user) => {
        if (err) {
            return res.status(500).json({ message: 'Error on server' });
        }
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        const passwordIsValid = bcrypt.compareSync(password, user.password);
        if (!passwordIsValid) {
            return res.status(401).json({ token: null, message: 'Invalid Password' });
        }

        const token = jwt.sign({ id: user.id, role: user.role }, SECRET_KEY, {
            expiresIn: 86400 // 24 hours
        });

        res.status(200).json({
            id: user.id,
            username: user.username,
            name: user.name,
            role: user.role,
            accessToken: token
        });
    });
};

exports.getAllUsers = (req, res) => {
    db.all(`SELECT id, username, name, role FROM users`, [], (err, rows) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.json(rows);
    });
};
