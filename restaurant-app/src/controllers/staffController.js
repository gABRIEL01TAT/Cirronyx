const staffService = require('../services/staffService');

exports.login = async(req, res) => {
    const { username, password } = req.body;
    try {
        const token = await staffService.authenticate(username, password);
        res.json({ token });
    } catch (error) {
        res.status(401).json({ message: error.message });
    }
};

exports.getStaffById = async(req, res) => {
    const { id } = req.params;
    try {
        const staff = await staffService.getStaffById(id);
        res.json(staff);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
};

exports.updateStaff = async(req, res) => {
    const { id } = req.params;
    const staffData = req.body;
    try {
        await staffService.updateStaff(id, staffData);
        res.json({ message: 'Staff updated successfully' });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

exports.deleteStaff = async(req, res) => {
    const { id } = req.params;
    try {
        await staffService.deleteStaff(id);
        res.json({ message: 'Staff deleted successfully' });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};