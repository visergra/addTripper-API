var express = require('express');
var router = express.Router();

const userController = require('../controllers/users.controller');
const passportConfig = require('../configs/passport.config');

router.get('/users', passportConfig.isAuthenticated, userController.getAll);
router.put('/users', passportConfig.isAuthenticated, userController.edit);//quitar id y coger el usuario de la cookie
router.get('/users/:id', passportConfig.isAuthenticated, userController.get);
router.get('/users/:id/trips', passportConfig.isAuthenticated, userController.getTrips);

module.exports = router;