const Menu = require('../models/Menu');
const MenuItem = require('../models/MenuItem');

exports.getAllMenus = async() => {
    try {
        return await Menu.findAll({
            include: [MenuItem],
        });
    } catch (error) {
        throw new Error('Failed to retrieve menus: ' + error.message);
    }
};

exports.getMenuById = async(id) => {
    try {
        const menu = await Menu.findByPk(id, {
            include: [MenuItem],
        });
        if (!menu) {
            throw new Error('Menu not found');
        }
        return menu;
    } catch (error) {
        throw new Error('Failed to retrieve menu: ' + error.message);
    }
};

exports.createMenu = async(menuData) => {
    try {
        const newMenu = await Menu.create(menuData);
        return newMenu;
    } catch (error) {
        throw new Error('Failed to create menu: ' + error.message);
    }
};

exports.updateMenu = async(id, menuData) => {
    try {
        const [updated] = await Menu.update(menuData, { where: { id } });
        if (!updated) {
            throw new Error('Menu not found or no changes made');
        }
        return { message: 'Menu updated successfully' };
    } catch (error) {
        throw new Error('Failed to update menu: ' + error.message);
    }
};

exports.deleteMenu = async(id) => {
    try {
        const deleted = await Menu.destroy({ where: { id } });
        if (!deleted) {
            throw new Error('Menu not found');
        }
        return { message: 'Menu deleted successfully' };
    } catch (error) {
        throw new Error('Failed to delete menu: ' + error.message);
    }
};