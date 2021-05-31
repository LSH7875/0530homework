const express= require('express');
const router = express.Router();
let token = require('../../jwt');
let crypto = require('crypto');

const {User} = require('../../models/index.js');
const { findOne } = require('../../models/user');

// router.get('/join',userRouter.login);
// router.post('/join',userRouter.joinpost);
// router.get('/login',userRouter.login);
// router.post('/login',userRouter.loginpost);

let join =(req,res) =>{
    res.render('./user/join.html')
}

let joinpost =async(req,res)=>{
    console.log('enter joinpost');
    let userid =req.body.userid;
    let userpw = crypto.createHmac('sha256',Buffer.from(process.env.salt)).update(req.body.userpw).digest('base64').replace('==','').replace('=','');
    console.log('userpw');
    console.log(userpw);
    console.log(typeof userpw);
    let username = req.body.username;

    try{
        let rst = await User.create({
            userid,userpw,username,
        })
    }catch(e){
        console.log(e);
    }
    
    res.render('./index.html');

}


let login = (req,res)=>{
    res.render('./user/login.html')
}

let loginpost = async(req,res)=>{
    let {userid}=req.body;
    let userpw = crypto.createHmac('sha256',Buffer.from(process.env.salt)).update(req.body.userpw).digest('base64').replace('==','').replace('=','');
    let result = await User.findOne({
        where:{userid,userpw}
    })

    if(result == null){
        console.log('login fail')
        res.redirect('/user/login?flag=0')
    }else{
        console.log('있음');
        let ctoken = token(userid);
        res.cookie('AccessToken',ctoken,{httpOnly:true,secure:true});
        res.redirect(`/?${userid}`);
    }
}

let logout = (req,res)=>{
    res.clearCookie('AccessToken');
    res.redirect('/?msg=로그아웃되었습니다.')
}

let info = async(req,res)=>{
    console.log('infostart');
    console.log(req);
    let {userid} = res;
    console.log(userid);
    let rst = await User.findOne({
        where:{userid,}
    });
    console.log('inforst');
    let {username} = rst.dataValues;
    res.render('./user/info.html',{
        userid,username,
    });

}
// let info =(req,res)=>{
//     res.send(`userid:${req.userid}`);
// }
module.exports={join,joinpost,login,loginpost,logout,info,

}