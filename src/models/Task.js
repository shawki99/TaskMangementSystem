const mongoose = require("mongoose");

const taskSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  dueDate: Date,
  assigneeID: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  statusID: {
    type: Number,
    ref: "StatusEnum",
  },
});

const Task = mongoose.model("Task", taskSchema, "Task");
module.exports = Task;
