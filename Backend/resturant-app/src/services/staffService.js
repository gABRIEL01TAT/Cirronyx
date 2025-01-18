import { Staff } from '../models/index.js'; // Adjust the path as necessary
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';

class StaffService {
    async login(credentials) {
        const { username, password } = credentials;
        const staffMember = await Staff.findOne({ where: { username } });

        if (!staffMember) {
            throw new Error('Invalid credentials');
        }

        const isPasswordValid = await bcrypt.compare(password, staffMember.password);
        if (!isPasswordValid) {
            throw new Error('Invalid credentials');
        }

        const token = jwt.sign({ id: staffMember.id }, process.env.JWT_SECRET, { expiresIn: '1h' });
        return { token };
    }

    async getStaffById(id) {
        const staffMember = await Staff.findByPk(id);
        if (!staffMember) {
            throw new Error('Staff member not found');
        }
        return staffMember;
    }

    async updateStaff(id, updates) {
        const [updated] = await Staff.update(updates, { where: { id } });
        if (!updated) {
            throw new Error('Failed to update staff member');
        }
        return { message: 'Staff member updated successfully' };
    }

    async deleteStaff(id) {
        const deleted = await Staff.destroy({ where: { id } });
        if (!deleted) {
            throw new Error('Failed to delete staff member');
        }
        return { message: 'Staff member deleted successfully' };
    }
}

export default new StaffService();