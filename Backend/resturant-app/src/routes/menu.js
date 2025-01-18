import { Router } from 'express';
const router = Router();
import { getAllMenus, getMenuById } from '../controllers/menucontroller.js';
router.get('/', getAllMenus);
router.get('/:id', getMenuById);
// Additional routes for create, update, and delete...

export default router;