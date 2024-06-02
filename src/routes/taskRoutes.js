const express = require('express');
const { createTask, getAllTasks, updateTaskDetails, updateTaskStatus, getTaskDetails } = require('../controllers/taskController');
const { verifyToken,isManager } = require("../middlewares/auth");
const {isTaskAssignedToUser}=require("../services/taskService");


const router = express.Router();

router.post('/', verifyToken,isManager, createTask);
router.get('/', verifyToken,isManager,isTaskAssignedToUser, getAllTasks);// if manager then all, if user then owned tasks
router.patch('/:id', verifyToken,isManager, updateTaskDetails);//manager
router.patch('/status/:id', verifyToken,isTaskAssignedToUser, updateTaskStatus);//owner
router.get('/:id', verifyToken,isManager,isTaskAssignedToUser, getTaskDetails);//owner or manager

module.exports = router;
