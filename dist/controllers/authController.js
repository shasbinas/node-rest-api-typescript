import jwt from 'jsonwebtoken';
import User from '../models/User.js';
export const registerUser = async (req, res) => {
    console.log('>>>> Register user function called');
    try {
        const { username, email, password, role, age } = req.body;
        if (!username || !email || !password) {
            res.status(400).json({ message: 'Please fill all required fields' });
            return;
        }
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            res.status(400).json({ message: 'User already exists' });
            return;
        }
        const user = await User.create({
            username,
            email,
            password,
            role: role || 'user',
            age: age || null,
        });
        const responseData = {
            _id: user._id.toString(),
            username: user.username,
            email: user.email,
            role: user.role,
            age: user.age,
        };
        res.status(201).json(responseData);
    }
    catch (error) {
        console.error('Error in registerUser:', error);
        res.status(500).json({ message: 'Server error' });
    }
};
export const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            res.status(400).json({ message: 'Email and password required' });
            return;
        }
        const user = await User.findOne({ email });
        if (!user || !(await user.matchPassword(password))) {
            res.status(401).json({ message: 'Invalid credentials' });
            return;
        }
        const token = jwt.sign({
            id: user._id,
            name: user.username,
            admin: user.role === 'admin',
        }, process.env.JWT_SECRET, { expiresIn: '1d' });
        const responseData = {
            _id: user._id.toString(),
            username: user.username,
            email: user.email,
            role: user.role,
            age: user.age,
            token,
        };
        res.status(200).json(responseData);
    }
    catch (error) {
        console.error('Error in loginUser:', error);
        res.status(500).json({ message: 'Server error' });
    }
};
//# sourceMappingURL=authController.js.map