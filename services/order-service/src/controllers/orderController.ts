import { Request, Response } from 'express';
import prisma from '../prisma';

export const createOrderHandler = async (req: Request, res: Response) => {
  const { items } = req.body;

  try {
    const order = await prisma.order.create({
      data: {
        items: {
          create: items.map((name: string) => ({ name }))
        }
      }
    });
    res.redirect('/order');
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to create order', details: error });
  }
};






// import { Request, Response } from 'express';
// import prisma from '../prisma';

// // Create Order
// export const createOrderHandler = async (req: Request, res: Response) => {
//     const { items } = req.body;

//     if (!items || !Array.isArray(items) || items.length === 0) {
//         return res.status(400).json({ error: 'Invalid input: items are required and must be a non-empty array.' });
//     }

//     try {
//         const newOrder = await prisma.order.create({
//             data: {
//                 items: {
//                     create: items.map((item: { name: string }) => ({ name: item.name })),
//                 },
//             },
//             include: { items: true },
//         });
//         res.status(201).json(newOrder);
//     } catch (error) {
//         console.error(error);
//         res.status(500).json({ error: 'Failed to create order' });
//     }
// };

// // Get Order by ID
// export const getOrderByIdHandler = async (req: Request, res: Response) => {
//     const { id } = req.params;

//     try {
//         const order = await prisma.order.findUnique({
//             where: { id: parseInt(id, 10) },
//             include: { items: true },
//         });
//         if (!order) return res.status(404).json({ error: 'Order not found' });
//         res.json(order);
//     } catch (error) {
//         console.error(error);
//         res.status(500).json({ error: 'Failed to fetch order' });
//     }
// };

// // Get All Orders
// export const getAllOrdersHandler = async (_req: Request, res: Response) => {
//     try {
//         const orders = await prisma.order.findMany({ include: { items: true } });
//         res.json(orders);
//     } catch (error) {
//         console.error(error);
//         res.status(500).json({ error: 'Failed to fetch orders' });
//     }
// };

// // Update Order
// export const updateOrderHandler = async (req: Request, res: Response) => {
//     const { id } = req.params;
//     const { items } = req.body;

//     if (!items || !Array.isArray(items) || items.length === 0) {
//         return res.status(400).json({ error: 'Invalid input: items are required and must be a non-empty array.' });
//     }

//     try {
//         const updatedOrder = await prisma.order.update({
//             where: { id: parseInt(id, 10) },
//             data: {
//                 items: {
//                     deleteMany: {}, // Delete existing items
//                     create: items.map((item: { name: string }) => ({ name: item.name })), // Create new items
//                 },
//             },
//             include: { items: true },
//         });
//         res.json(updatedOrder);
//     } catch (error) {
//         console.error(error);
//         res.status(500).json({ error: 'Failed to update order' });
//     }
// };

// // Delete Order
// export const deleteOrderHandler = async (req: Request, res: Response) => {
//     const { id } = req.params;

//     try {
//         await prisma.order.delete({
//             where: { id: parseInt(id, 10) },
//         });
//         res.status(204).send();
//     } catch (error) {
//         console.error(error);
//         res.status(500).json({ error: 'Failed to delete order' });
//     }
// };
