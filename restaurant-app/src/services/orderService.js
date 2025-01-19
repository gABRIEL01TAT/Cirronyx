const Order = require('../models/Order');
const OrderItem = require('../models/OrderItem');
const MenuItem = require('../models/MenuItem');

exports.createOrder = async(orderData) => {
    const order = await Order.create(orderData);
    if (orderData.items) {
        const orderItems = orderData.items.map(item => ({
            orderId: order.id,
            menuItemId: item.menuItemId,
            quantity: item.quantity,
            price: item.price, // Assuming price is passed in the orderData
        }));
        await OrderItem.bulkCreate(orderItems);
    }
    return order;
};

exports.getAllOrders = async() => {
    return await Order.findAll({
        include: [{ model: OrderItem, include: [MenuItem] }],
    });
};

exports.getOrderById = async(id) => {
    return await Order.findByPk(id, {
        include: [{ model: OrderItem, include: [MenuItem] }],
    });
};

exports.updateOrder = async(id, orderData) => {
    await Order.update(orderData, { where: { id } });
};