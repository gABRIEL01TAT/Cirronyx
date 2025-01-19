const express = require('express');
const router = express.Router();
const staffController = require('../controllers/staffController');

router.post('/login', staffController.login);
router.get('/:id', staffController.getStaffById);
router.put('/:id', staffController.updateStaff);
router.delete('/:id', staffController.deleteStaff);

module.exports = router;