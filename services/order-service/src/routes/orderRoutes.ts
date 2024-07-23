import { Router } from 'express';
import { createOrderHandler } from '../controllers/orderController';

const router = Router();

router.get('/create', (req, res) => {
  res.render('createOrder');
});

router.post('/create', createOrderHandler);

export default router;




// import { Router } from 'express';
// import {
//     createOrderHandler,
//     getOrderByIdHandler,
//     getAllOrdersHandler,
//     updateOrderHandler,
//     deleteOrderHandler,
// } from '../controllers/orderController';

// const router = Router();

// router.get('/orders/create', (req, res) => res.render('createOrder'));
// router.post('/orders', createOrderHandler);
// router.get('/orders/:id', getOrderByIdHandler);
// router.get('/orders', getAllOrdersHandler);
// router.get('/orders/:id/edit', getOrderByIdHandler);
// router.post('/orders/:id', updateOrderHandler);
// router.post('/orders/:id/delete', deleteOrderHandler);

// export default router;
