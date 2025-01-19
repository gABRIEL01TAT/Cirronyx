const menuService = require('../services/menuService');

exports.getAllMenus = async(req, res) => {
    try {
        const menus = await menuService.getAllMenus();
        res.json(menus);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.getMenuById = async(req, res) => {
    const { id } = req.params;
    try {
        const menu = await menuService.getMenuById(id);
        res.json(menu);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
};

exports.createMenu = async(req, res) => {
    const menuData = req.body;
    try {
        const newMenu = await menuService.createMenu(menuData);
        res.status(201).json({ message: 'Menu created successfully', id: newMenu.id });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

exports.updateMenu = async(req, res) => {
    const { id } = req.params;
    const menuData = req.body;
    try {
        await menuService.updateMenu(id, menuData);
        res.json({ message: 'Menu updated successfully' });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

exports.deleteMenu = async(req, res) => {
    const { id } = req.params;
    try {
        await menuService.deleteMenu(id);
        res.json({ message: 'Menu deleted successfully' });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};