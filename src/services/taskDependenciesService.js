const TaskDependencies = require("../models/TaskDependencies");

exports.getTaskDependencies = async (taskId) => {
  return await TaskDependencies.find({ parentTaskID: taskId });
};
exports.getTaskDependenciesDetails = async (taskId) => {
  return await TaskDependencies.find({ parentTaskID: taskId }).populate(
    "subTaskID"
  );
};
