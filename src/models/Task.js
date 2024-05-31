const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  description: String,
  dueDate: Date,
  assigneeID: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  statusID: {
    type: mongoose.Schema.Types.Number,
    ref: 'StatusEnum'
  }
});

const Task = mongoose.model('Task', taskSchema);
module.exports = Task;
