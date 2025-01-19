const Staff = require('../models/Staff');
const jwt = require('jsonwebtoken');

exports.authenticate = async(username, password) => {
    const staff = await Staff.findOne({ where: { username } });
    if (!staff || staff.password !== password) {
        throw new Error('Invalid credentials');
    }
    return jwt.sign({ id: staff.id, role: staff.role }, process.env.JWT_SECRET, { expiresIn: '1h' });
};

exports.getStaffById = async(id) => {
    return await Staff.findByPk(id);
};

exports.updateStaff = async(id, staffData) => {
    await Staff.update(staffData, { where: { id } });
};

exports.deleteStaff = async(id) => {
    await Staff.destroy({ where: { id } });
};