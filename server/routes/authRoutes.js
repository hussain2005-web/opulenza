const express = require('express');
const router = express.Router();
const controller = require('../controllers/authController');
const { verifyToken, verifyRole } = require('../middleware/authMiddleware');

router.post('/register', controller.register);
router.post('/login', controller.login);

// Admin only route to get all users
router.get('/users', [verifyToken, verifyRole(['admin'])], controller.getAllUsers);

module.exports = router;
