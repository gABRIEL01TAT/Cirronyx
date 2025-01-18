import { create, findAll } from '../models/oder.js';

export async function createOrder(req, res) {
    const order = await create({ staffId: req.userId, status: 'pending' });
    res.send({ message: 'Order created successfully.', orderId: order.id });
}

export async function getAllOrders(req, res) {
    const orders = await findAll();
    res.send(orders);
}

// Additional order controller methods for get by id and update...