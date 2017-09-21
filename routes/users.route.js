var express = require('express');
var router = express.Router();

const userController = require('../controllers/users.controller');

router.get('/users', userController.getAll);
router.put('/users/:id', userController.edit);
router.get('/users/:id', userController.get);

module.exports = router;