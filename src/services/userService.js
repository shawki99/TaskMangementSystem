const User = require('../models/User');
const bcrypt = require('bcryptjs');

exports.findUserByEmail = async (email) => {
    return await User.findOne({ email });
};

exports.createUser = async ({ userName, email, password, roleID }) => {
    const user = new User({ userName, email, password, roleID });
    await user.save();
    return user;
};

exports.comparePassword = async (inputPassword, storedPassword) => {
    return await bcrypt.compare(inputPassword, storedPassword);
};