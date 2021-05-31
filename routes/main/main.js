const express= require('express');
const router = express.Router();
const mainController = require('./main.controller');
const auth =require('../../middleware/auth');

router.get('/',mainController.index);

module.exports = router;