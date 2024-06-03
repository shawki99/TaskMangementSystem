const {
  findUserByEmail,
  createUser,
  comparePassword,
} = require("../services/userService");
const { generateToken } = require("../middlewares/auth");
const bcrypt = require("bcrypt");

// Registration
exports.createUser = async (req, res) => {
  try {
    const { userName, email, password, roleID } = req.body;
    let user = await findUserByEmail(email);
    if (user) {
      return res.status(400).send("User already exists");
    }

    user = await createUser({ userName, email, password, roleID });
    res.status(201).json({ msg: "user is created !" });
  } catch (err) {
    res.status(500).send("Error registering new user");
  }
};

// Login
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await findUserByEmail(email);
    console.log(user);
    if (!user || !bcrypt.compareSync(password, user.password)) {
      return res.status(401).send("Invalid credentials");
    }

    const token = generateToken({ id: user._id, role: user.roleID });
    res.json({ token });
  } catch (err) {
    res.status(500).send("Error logging in user");
  }
};
