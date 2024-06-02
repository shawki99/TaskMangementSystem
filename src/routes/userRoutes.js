const express = require('express');
const { register, login } = require('../controllers/userController');

const router = express.Router();

router.post('/register', register); //manager only
router.post('/login', login);

module.exports = router;
