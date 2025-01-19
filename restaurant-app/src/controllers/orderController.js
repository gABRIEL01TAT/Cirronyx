exports.createOrder = async(req, res) => {
    const orderData = req.body;
    try {
        const newOrder = await orderService.createOrder(orderData);
        res.status(201).json({ message: 'Order created successfully', id: newOrder.id });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

exports.getAllOrders = async(req, res) => {
    try {
        const orders = await orderService.getAllOrders();
        res.json(orders);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.getOrderById = async(req, res) => {
    const { id } = req.params;
    try {
        const order = await orderService.getOrderById(id);
        res.json(order);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
};

exports.updateOrder = async(req, res) => {
    const { id } = req.params;
    const orderData = req.body;
    try {
        await orderService.updateOrder(id, orderData);
        res.json({ message: 'Order updated successfully' });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};