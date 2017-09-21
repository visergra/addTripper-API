var express = require('express');
var router = express.Router();

const tripController = require('../controllers/trips.controller');

router.post('/trips', tripController.create);
router.get('/trips', tripController.getAll);
router.put('/trips/:id', tripController.edit);
router.get('/trips/:id', tripController.get);
//router.put('/trips/:id/register', tripController.register);
//router.delete('/trips/:id', tripController.remove);

module.exports = router;