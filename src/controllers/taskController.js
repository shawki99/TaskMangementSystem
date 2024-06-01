const Task = require('../models/Task');

exports.createTask = async (req, res) => {
    if (req.user.role !== 'Manager') {
        return res.status(403).send('Only managers can create tasks');
    }
    try {
        const task = new Task(req.body);
        await task.save();
        res.status(201).send(task);
    } catch (error) {
        res.status(400).send(error);
    }
};

exports.getAllTasks = async (req, res) => {
    let query = Task.find();
    // Filter by status, due date range, or assigned user
    if (req.query.status) query.where('statusID', req.query.status);
    if (req.query.assignee) query.where('assigneeID', req.query.assignee);
    if (req.query.dueDateStart && req.query.dueDateEnd) {
        query.where('dueDate').gte(new Date(req.query.dueDateStart)).lte(new Date(req.query.dueDateEnd));
    }

    try {
        const tasks = await query.exec();
        res.send(tasks);
    } catch (error) {
        res.status(500).send(error);
    }
};

exports.updateTaskDetails = async (req, res) => {
    if (req.user.role !== 'Manager') {
        return res.status(403).send('Only managers can update tasks');
    }
    try {
        const task = await Task.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.send(task);
    } catch (error) {
        res.status(404).send(error);
    }
};

exports.updateTaskStatus = async (req, res) => {
    try {
        const task = await Task.findById(req.params.id);
        if (!task) return res.status(404).send('Task not found');

        if (task.assigneeID.toString() !== req.user._id.toString()) {
            return res.status(403).send('You can only update status for tasks assigned to you');
        }
        task.statusID = req.body.statusID;
        await task.save();
        res.send(task);
    } catch (error) {
        res.status(400).send(error);
    }
};

exports.getTaskDetails = async (req, res) => {
    try {
        const task = await Task.findById(req.params.id).populate('dependencies');
        if (!task) return res.status(404).send('Task not found');
        res.send(task);
    } catch (error) {
        res.status(500).send(error);
    }
};
