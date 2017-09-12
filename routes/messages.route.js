var express = require('express');
var router = express.Router();

const messagesController = require('../controllers/messages.controller');

router.get('/message', messagesController.getMessage);

module.exports = router;
