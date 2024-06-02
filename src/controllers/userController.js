const { findUserByEmail, createUser, comparePassword } = require('../services/userService');
const { generateToken } = require('../utils/jwtHelper');

// Registration
exports.register = async (req, res) => {
    try {
        const { userName, email, password, roleID } = req.body;
        let user = await findUserByEmail(email);
        if (user) {
            return res.status(400).send('User already exists');
        }
        
        user = await createUser({ userName, email, password, roleID });
        
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
        const user = await findUserByEmail(email);
        if (!user || !(await comparePassword(password, user.password))) {
            return res.status(401).send('Invalid credentials');
        }
        
        const token = generateToken({ id: user._id, email: user.email, role: user.roleID });
        res.send({ token });
    } catch (err) {
        res.status(500).send('Error logging in user');
    }
};
