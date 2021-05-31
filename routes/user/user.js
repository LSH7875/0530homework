const express= require('express');
const router = express.Router();
const userRouter = require('./user.controller');
const auth = require('../../middleware/auth');

router.get('/join',userRouter.join);
router.post('/join',userRouter.joinpost);
router.get('/login',userRouter.login);
router.post('/login',userRouter.loginpost);
router.get('/logout',userRouter.logout);
router.get('/info',auth,userRouter.info);


module.exports=router;
