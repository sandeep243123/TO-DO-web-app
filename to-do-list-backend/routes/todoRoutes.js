const express = require('express');

const router = express.Router();
const { signup } = require('../controllers/signUp');
const { login } = require('../controllers/login');
const { createTask, getTasks, updateStatus, deleteTask, gettasksByStatus } = require('../controllers/taskController');

const { auth } = require('../middleware/auth')

router.post('/signup', signup);
router.post('/login', login);

router.post('/createTask', auth, createTask);
router.post('/update', auth, updateStatus);
router.post('/deleteTask', deleteTask)

router.get('/getTasks/:userId', auth, getTasks);
router.get('/getTasksByStatus/:userId', auth, gettasksByStatus)

module.exports = router;