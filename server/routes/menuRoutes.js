const express = require('express');
const router = express.Router();
const controller = require('../controllers/menuController');
const { verifyToken, verifyRole } = require('../middleware/authMiddleware');

// Public or Authenticated Users can view menu
router.get('/', controller.getAllMenuItems);

// Only Admin can manage menu
router.post('/', [verifyToken, verifyRole(['admin'])], controller.addMenuItem);
router.put('/:id', [verifyToken, verifyRole(['admin'])], controller.updateMenuItem);
router.delete('/:id', [verifyToken, verifyRole(['admin'])], controller.deleteMenuItem);

module.exports = router;
