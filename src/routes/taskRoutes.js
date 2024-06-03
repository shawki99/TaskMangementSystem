const express = require("express");
const {
  createTask,
  getAllTasks,
  updateTaskDetails,
  updateTaskStatus,
  getTaskDetails,
} = require("../controllers/taskController");
const {
  verifyToken,
  isManager,
  isManagerOrTaskOwner,
  isTaskOwner,
} = require("../middlewares/auth");

const router = express.Router();

router.post("/", verifyToken, isManager, createTask);
router.get("/", verifyToken, getAllTasks);
router.patch("/:id", verifyToken, isManager, updateTaskDetails);
router.patch("/status/:id", verifyToken, isTaskOwner, updateTaskStatus);
router.get("/:id", verifyToken, isManagerOrTaskOwner, getTaskDetails);

module.exports = router;
