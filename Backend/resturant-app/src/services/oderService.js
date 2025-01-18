import { Order, OrderItem, MenuItem } from '../models/index.js'; // Adjust the path as necessary

class OrderService {
    async createOrder(orderData) {
        const newOrder = await Order.create(orderData);
        return { message: 'Order created successfully', orderId: newOrder.id };
    }

    async getAllOrders() {
        return await Order.findAll({
            include: [{ model: OrderItem, include: [MenuItem] }] // Assuming relations exist
        });
    }

    async getOrderById(id) {
        const order = await Order.findByPk(id, {
            include: [{ model: OrderItem, include: [MenuItem] }]
        });
        if (!order) {
            throw new Error('Order not found');
        }
        return order;
    }

    async updateOrderStatus(id, status) {
        const [updated] = await Order.update({ status }, { where: { id } });
        if (!updated) {
            throw new Error('Failed to update order status');
        }
        return { message: 'Order status updated successfully' };
    }
}

export default new OrderService();