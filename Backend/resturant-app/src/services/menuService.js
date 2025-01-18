import { Menu, MenuItem } from '../models/index.js'; // Adjust the path as necessary

class MenuService {
    async getAllMenus() {
        return await Menu.findAll();
    }

    async getMenuById(id) {
        const menu = await Menu.findByPk(id, {
            include: [{ model: MenuItem, as: 'items' }] // Assuming a relation exists
        });
        if (!menu) {
            throw new Error('Menu not found');
        }
        return menu;
    }

    async createMenu(menuData) {
        const newMenu = await Menu.create(menuData);
        return { message: 'Menu created successfully', menuId: newMenu.id };
    }

    async updateMenu(id, updates) {
        const [updated] = await Menu.update(updates, { where: { id } });
        if (!updated) {
            throw new Error('Failed to update menu');
        }
        return { message: 'Menu updated successfully' };
    }

    async deleteMenu(id) {
        const deleted = await Menu.destroy({ where: { id } });
        if (!deleted) {
            throw new Error('Failed to delete menu');
        }
        return { message: 'Menu deleted successfully' };
    }

    async updateMenuItemAvailability(menuId, itemId, updates) {
        const [updated] = await MenuItem.update(updates, { where: { menuId, id: itemId } });
        if (!updated) {
            throw new Error('Failed to update menu item');
        }
        return { message: 'Menu item updated successfully' };
    }
}

export default new MenuService();