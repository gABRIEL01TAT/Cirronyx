const express = require('express');
const bodyParser = require('body-parser');
const staffRoutes = require('./routes/staff');
const menuRoutes = require('./routes/menu');
const orderRoutes = require('./routes/order');
const { connectDB } = require('./config/database');
const authMiddleware = require('./middleware/authMiddleware');

const app = express();
app.use(bodyParser.json());

// Connect to the database
connectDB();

// Middleware for authentication
app.use(authMiddleware);

// Routes
app.use('/staff', staffRoutes);
app.use('/menu', menuRoutes);
app.use('/order', orderRoutes);

// Global error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something broke!');
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});