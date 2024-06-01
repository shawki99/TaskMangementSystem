const express = require('express');
const { createTask, getAllTasks, updateTaskDetails, updateTaskStatus, getTaskDetails } = require('../controllers/taskController');
const { verifyTokenAndRole } = require('../utils/jwtHelper');

const router = express.Router();

router.post('/', verifyTokenAndRole(['Manager']), createTask);
router.get('/', verifyTokenAndRole(['Manager', 'User']), getAllTasks);
router.patch('/:id', verifyTokenAndRole(['Manager']), updateTaskDetails);
router.patch('/status/:id', verifyTokenAndRole(['User']), updateTaskStatus);
router.get('/:id', verifyTokenAndRole(['Manager', 'User']), getTaskDetails);

module.exports = router;
