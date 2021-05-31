const express= require('express');
const router = express.Router();
const mainRouter=require('./main/main');
const userRouter = require('./user/user');

router.use('/user',userRouter);
router.use('/',mainRouter);

module.exports = router;