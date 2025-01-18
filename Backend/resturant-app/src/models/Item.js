import { DataTypes } from 'sequelize';
import { define } from '../config/database.js'; //database

const Item = define('Item', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    description: {
        type: DataTypes.STRING
    }
});

export default Item;