import { DataTypes } from 'sequelize';
import { define } from '../config/database.js';

const Menu = define('Menu', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false
    }
});

export default Menu;