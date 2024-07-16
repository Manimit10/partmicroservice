import { Request, Response } from 'express';
import { createOrder, getOrderById, getAllOrders, updateOrder, deleteOrder } from '../models/order';

export const createOrderHandler = async (req: Request, res: Response) => {
    const orderData = req.body;
    try {
        const order = await createOrder(orderData);
        res.status(201).json(order);
    } catch (error) {
        res.status(500).json({ error: 'Failed to create order' });
    }
};

export const getOrderByIdHandler = async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
        const order = await getOrderById(Number(id));
        if (order) {
            res.render('getOrder', { order });
        } else {
            res.status(404).render('getOrder', { order: null });
        }
    } catch (error) {
        res.status(500).json({ error: 'Failed to get order' });
    }
};

export const getAllOrdersHandler = async (req: Request, res: Response) => {
    try {
        const orders = await getAllOrders();
        res.render('getAllOrders', { orders });
    } catch (error) {
        res.status(500).json({ error: 'Failed to get orders' });
    }
};

export const updateOrderHandler = async (req: Request, res: Response) => {
    const { id } = req.params;
    const updateData = req.body;
    try {
        const order = await updateOrder(Number(id), updateData);
        if (order) {
            res.render('updateOrder', { order });
        } else {
            res.status(404).render('updateOrder', { order: null });
        }
    } catch (error) {
        res.status(500).json({ error: 'Failed to update order' });
    }
};

export const deleteOrderHandler = async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
        const order = await getOrderById(Number(id));
        if (order) {
            await deleteOrder(Number(id));
            res.render('deleteOrder', { order });
        } else {
            res.status(404).render('deleteOrder', { order: null });
        }
    } catch (error) {
        res.status(500).json({ error: 'Failed to delete order' });
    }
};
