const User = require('../models/User');
const bcrypt = require('bcryptjs');
const { generateToken } = require('../utils/jwtHelper');

// Registration
exports.register = async (req, res) => {
    try {
        const { userName, email, password, roleID } = req.body;
        let user = await User.findOne({ email });
        if (user) {
            return res.status(400).send('User already exists');
        }
        
        user = new User({ userName, email, password, roleID });
        await user.save();
        
        const token = generateToken({ id: user._id, role: user.roleID });
        res.status(201).send({ token });
    } catch (err) {
        res.status(500).send('Error registering new user');
    }
};

// Login
exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });
        if (!user || !(await bcrypt.compare(password, user.password))) {
            return res.status(401).send('Invalid credentials');
        }
        
        const token = generateToken({ id: user._id, role: user.roleID });
        res.send({ token });
    } catch (err) {
        res.status(500).send('Error logging in user');
    }
};
