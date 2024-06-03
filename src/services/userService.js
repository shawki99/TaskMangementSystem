const User = require('../models/User');


exports.findUserByEmail = async (email) => {
    return await User.findOne({ email });
};

exports.createUser = async (userData) => {
    const user = new User(userData);
    await user.save();
    return user;
};

