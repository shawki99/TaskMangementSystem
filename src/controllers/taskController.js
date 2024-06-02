const {
  createTask,
  findTasks,
  findTaskByIdAndUpdate,
  findTaskById,
  saveTask,
  findTaskDetailsById,
  isTaskAssignedToUser, // Import the new function
} = require("../services/taskService");

// Create a new task
exports.createTask = async (req, res) => {
  if (req.user.role !== "Manager") {
    return res.status(403).send("Only managers can create tasks");
  }
  try {
    const task = await createTask(req.body);
    res.status(201).send(task);
  } catch (error) {
    res.status(400).send(error);
  }
};

// Retrieve a list of all tasks, with optional filtering
exports.getAllTasks = async (req, res) => {
  let query = Task.find();

  // If the user is not a manager, filter tasks assigned to them
  if (req.user.role !== "Manager") {
    query.where("assigneeID", req.user._id);
  }

  // Additional filters
  if (req.query.status) query.where("statusID", req.query.status);
  if (req.query.assignee) query.where("assigneeID", req.query.assignee);
  if (req.query.dueDateStart && req.query.dueDateEnd) {
    query
      .where("dueDate")
      .gte(new Date(req.query.dueDateStart))
      .lte(new Date(req.query.dueDateEnd));
  }

  try {
    const tasks = await findTasks(query);
    res.send(tasks);
  } catch (error) {
    res.status(500).send(error);
  }
};

// Update task details
exports.updateTaskDetails = async (req, res) => {
  if (req.user.role !== "Manager") {
    return res.status(403).send("Only managers can update tasks");
  }
  try {
    const task = await findTaskByIdAndUpdate(req.params.id, req.body);
    res.send(task);
  } catch (error) {
    res.status(404).send(error);
  }
};

// Update task status
exports.updateTaskStatus = async (req, res) => {
  try {
    const task = await findTaskById(req.params.id);
    if (!task) return res.status(404).send("Task not found");

    if (task.assigneeID.toString() !== req.user._id.toString()) {
      return res
        .status(403)
        .send("You can only update status for tasks assigned to you");
    }
    task.statusID = req.body.statusID;
    await saveTask(task);
    res.send(task);
  } catch (error) {
    res.status(400).send(error);
  }
};

// Retrieve task details including dependencies
exports.getTaskDetails = async (req, res) => {
  try {
    const task = await findTaskDetailsById(req.params.id);
    if (!task) return res.status(404).send("Task not found");

    // Ensure the task belongs to the user if they are not a manager
    if (
      req.user.role !== "Manager" &&
      task.assigneeID.toString() !== req.user._id.toString()
    ) {
      return res.status(403).send("You can only view tasks assigned to you");
    }

    res.send(task);
  } catch (error) {
    res.status(500).send(error);
  }
};
