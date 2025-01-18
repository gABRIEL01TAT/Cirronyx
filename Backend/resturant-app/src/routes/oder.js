import { Router } from 'express';
const router = Router();
import { createOrder, getAllOrders } from '../controllers/odercontroller.js'; //odercontrlloer
import authMiddleware from '../middleware/authmiddleware.js';

router.post('/', authMiddleware, createOrder);
router.get('/', authMiddleware, getAllOrders);
// Additional routes for get by id and update...

export default router;