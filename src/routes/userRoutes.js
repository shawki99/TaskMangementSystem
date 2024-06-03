const express = require('express');
const { createUser, login } = require('../controllers/userController');
const { isManager, verifyToken } = require('../middlewares/auth');

const router = express.Router();

router.post('/create-user',verifyToken,isManager, createUser);
router.post('/login', login);

module.exports = router;
