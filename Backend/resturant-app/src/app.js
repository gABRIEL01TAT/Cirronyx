import express, { json } from 'express';
import helmet from 'helmet';
import staffRoutes from './routes/staff.js'; //staff.js
import menuRoutes from './routes/menu.js'; //menu.js
import orderRoutes from './routes/oder.js'; //oder.js
import { sync } from './config/database.js'; //database.js

const app = express();
app.use(helmet());
app.use(json());

app.use('/staff', staffRoutes);
app.use('/menu', menuRoutes);
app.use('/order', orderRoutes);

const startServer = async() => {
    try {
        await sync();
        app.listen(3000, () => {
            console.log('Server is running on port 3000');
        });
    } catch (error) {
        console.error('Unable to connect to the database:', error);
    }
};

startServer();

//Integrating Error Handling
const errorHandler = require('./middleware/errorHandler').default;

app.use(errorHandler);

//Integrating Logging
const logMiddleware = require('./middleware/logger');

app.use(logMiddleware);