import { PrismaClient, Order } from '@prisma/client';

const prisma = new PrismaClient();

export const createOrder = async (data: Order): Promise<Order> => {
    return prisma.order.create({ data });
};

export const getOrderById = async (id: number): Promise<Order | null> => {
    return prisma.order.findUnique({ where: { id } });
};

export const getAllOrders = async (): Promise<Order[]> => {
    return prisma.order.findMany();
};

export const updateOrder = async (id: number, data: Partial<Order>): Promise<Order | null> => {
    return prisma.order.update({ where: { id }, data });
};

export const deleteOrder = async (id: number): Promise<Order | null> => {
    return prisma.order.delete({ where: { id } });
};
