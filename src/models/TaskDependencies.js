const mongoose = require("mongoose");

const taskDependenciesSchema = new mongoose.Schema({
  parentTaskID: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Task",
  },
  subTaskID: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Task",
  },
});

const TaskDependencies = mongoose.model(
  "TaskDependencies",
  taskDependenciesSchema,
  "TaskDependencies"
);
module.exports = TaskDependencies;
