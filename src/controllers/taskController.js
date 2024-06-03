const { USER } = require("../constants/roles");
const {
  getTaskDependenciesDetails,
} = require("../services/taskDependenciesService");
const {
  createTask,
  findTasks,

  findTaskById,
  saveTask,
  findTaskDetailsById,
} = require("../services/taskService");

// Create a new task
exports.createTask = async (req, res) => {
  try {
    const task = await createTask(req.body);
    res.status(201).send(task);
  } catch (error) {
    res.status(400).send(error);
  }
};

// Retrieve a list of all tasks, with optional filtering
exports.getAllTasks = async (req, res) => {
  const filters = {};
  if (req.query.status) {
    filters.statusID = req.query.status;
  }
  if (req.query.dueDateStart && req.query.dueDateEnd) {
    filters.dueDate = {
      $gte: req.query.dueDateStart,
      $lte: req.query.dueDateEnd,
    };
  }
  if (req.user.role == USER) {
    filters.assigneeID = req.user.id;
  }

  try {
    const tasks = await findTasks(filters);
    res.send(tasks);
  } catch (error) {
    res.status(500).send(error);
  }
};

// Update task details
exports.updateTaskDetails = async (req, res) => {
  try {
    const task = await findTaskById(req.params.id);
    if (task) {
      task.title = req.body.title ? req.body.title : task.title;
      task.description = req.body.description
        ? req.body.description
        : task.description;
      task.dueDate = req.body.dueDate ? req.body.dueDate : task.dueDate;
      task.assigneeID = req.body.assigneeID
        ? req.body.assigneeID
        : task.assigneeID;
      await saveTask(task);
      res.json(task);
    } else {
      res.status(400).json({ msg: "Task is not Found" });
    }
  } catch (error) {
    res.status(404).send(error);
  }
};

// Update task status
exports.updateTaskStatus = async (req, res) => {
  try {
    const task = await findTaskById(req.params.id);
    if (!task) return res.status(404).send("Task not found");
    task.statusID = req.body.statusID;
    await saveTask(task);
    res.json(task);
  } catch (error) {
    res.status(400).json({ error });
  }
};

// Retrieve task details including dependencies
exports.getTaskDetails = async (req, res) => {
  try {
    const taskID = req.params.id;
    const task = await findTaskDetailsById(taskID);

    if (!task) return res.status(404).send("Task not found");
    const dependencies = await getTaskDependenciesDetails(taskID);
    return res.json({
      ...task,
      dependencies,
    });
  } catch (error) {
    return res.status(500).json({ error });
  }
};
