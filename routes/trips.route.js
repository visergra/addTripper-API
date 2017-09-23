var express = require('express');
var router = express.Router();

const tripController = require('../controllers/trips.controller');
const passportConfig = require('../configs/passport.config');

router.post('/trips', passportConfig.isAuthenticated, tripController.create);
router.get('/trips', tripController.getAll);
router.put('/trips/:id/register', passportConfig.isAuthenticated, tripController.register);
router.put('/trips/:id/approve', passportConfig.isAuthenticated, tripController.approve);
router.put('/trips/:id/reject', passportConfig.isAuthenticated, tripController.reject);
router.put('/trips/:id', passportConfig.isAuthenticated, tripController.edit);
router.get('/trips/:id', tripController.get);
router.delete('/trips/:id', passportConfig.isAuthenticated, tripController.remove);

module.exports = router;