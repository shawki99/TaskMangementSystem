require("dotenv").config();
const jwt = require("jsonwebtoken");
const permissionRoles = require("../constants/roles");
const tServices=require("../services/taskService");
const tControllers=require("../controllers/taskController");

const JWT_SECRET = process.env.JWT_SECRET;

// Function to generate a JWT token that includes the user's role
exports.generateToken = (user) => {
  const payload = {
    id: user.id, 
    email: user.email, 
    role: user.role, 
  };
  return jwt.sign(payload, JWT_SECRET, { expiresIn: "23h" }); 
};

// Middleware to verify a JWT token and the user's role
exports.verifyToken = (req, res, next) => {
  const token = req.headers["authorization"]
    ? req.headers["authorization"].split(" ")[1]
    : null;

  if (!token) {
    return res
      .status(403)
      .send({ message: "A token is required for authentication" });
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.user = decoded;

    // // Check if the user's role is allowed
    // if (!roles.includes(decoded.role)) {
    //   return res.status(401).send({ message: 'Unauthorized: Your role does not have access to this resource' });
    // }
  } catch (err) {
    return res.status(401).send({ message: "Invalid Token" });
  }

  return next();
};

exports.isManager = (req, res, next) => {
  try {
    const userRole = req.user.role;
    const isFound = checkUserRole(userRole, [permissionRoles.MANAGER]);
    if (!isFound) {
      res
        .status(401)
        .send({
          message:
            "Unauthorized: Your role does not have access to this resource",
        });
    }
  } catch (err) {
    return res.status(401).send({ message: "Invalid Token" });
  }

  return next();
};

const checkUserRole = (userRole, permittedRoles) => {
  // Check if the user's role is allowed
  return permittedRoles.includes(userRole);
};

exports.isTaskOwner = (req, res, next) => {
  try {
    const userID = req.user.id;
    const taskID=req.params.id;
    const isFound =tControllers.getTaskDetails(req,res) || tServices.isTaskAssignedToUser(taskID,userID); //create function in services to make sure that the task id belong to this user
    if (!isFound) {
      res
        .status(401)
        .send({
          message:
            "Unauthorized: Your role does not have access to this resource",
        });
    }
  } catch (err) {
    return res.status(401).send({ message: "Invalid Token" });
  }

  return next();
};