// models/order.ts
export interface OrderItem {
    name: string;
}

export interface Order {
    id?: number;
    createdAt?: Date;
    updatedAt?: Date;
    items: OrderItem[];
}
