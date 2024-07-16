import { Request, Response } from 'express';
import prisma from '../prisma';

export const getAllOrders = async (req: Request, res: Response) => {
  const orders = await prisma.order.findMany();
  res.render('orders', { orders });
};

export const createOrder = async (req: Request, res: Response) => {
  const { orderDate, status, supplierId } = req.body;
  const newOrder = await prisma.order.create({
    data: { orderDate, status, supplierId }
  });
  res.json(newOrder);
};
