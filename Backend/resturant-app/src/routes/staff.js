import { Router } from 'express';
const router = Router();
import { login, getStaffById } from '../controllers/staffcontroller.js';
import authMiddleware from '../middleware/authmiddleware.js';

router.post('/login', login);
router.get('/:id', authMiddleware, getStaffById);
// Additional routes for update and delete...

export default router;