const express = require('express');
const router = express.Router();
const controller = require('../controller/weatherController');
router.get('/', controller.index);
module.exports = router;