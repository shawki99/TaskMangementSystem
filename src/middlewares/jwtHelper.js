require('dotenv').config();
const jwt = require('jsonwebtoken');

const JWT_SECRET = process.env.JWT_SECRET;

// Function to generate a JWT token that includes the user's role
exports.generateToken = (user) => {
  const payload = {
    id: user.id,     // User's ID
    email: user.email, // User's email
    role: user.role  // User's role (e.g., 'Manager' or 'User')
  };
  return jwt.sign(payload, JWT_SECRET, { expiresIn: '1h' }); // Token expires in 1 hour
};

// Middleware to verify a JWT token and the user's role
exports.verifyTokenAndRole = (roles) => (req, res, next) => {
  const token = req.headers['authorization'] ? req.headers['authorization'].split(' ')[1] : null;

  if (!token) {
    return res.status(403).send({ message: 'A token is required for authentication' });
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.user = decoded;

    // Check if the user's role is allowed
    if (!roles.includes(decoded.role)) {
      return res.status(401).send({ message: 'Unauthorized: Your role does not have access to this resource' });
    }
  } catch (err) {
    return res.status(401).send({ message: 'Invalid Token' });
  }

  return next();
};
