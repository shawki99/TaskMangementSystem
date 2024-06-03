const Task = require("../models/Task");

exports.createTask = async (taskData) => {
  const task = new Task(taskData);
  await task.save();
  return task;
};

exports.findTasks = async (filters) => {
  return await Task.find(filters);
};

exports.findTaskByIdAndUpdate = async (taskId, updateData) => {
  return await Task.findByIdAndUpdate(taskId, updateData);
};

exports.findTaskById = async (taskId) => {
  return await Task.findById(taskId);
};

exports.saveTask = async (task) => {
  return await task.save();
};

exports.findTaskDetailsById = async (taskId) => {
  return await Task.findById(taskId);
};

exports.isTaskAssignedToUser = async (taskId, userId) => {
  const task = await Task.findById(taskId);
  return task && task.assigneeID.toString() === userId.toString();
};
