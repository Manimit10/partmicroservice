import { Router } from 'express';
import { getAllOrders, createOrder } from '../controllers/orders';

const router = Router();

router.get('/', getAllOrders);
router.post('/', createOrder);

export default router;
