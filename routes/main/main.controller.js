const express= require('express');
const router = express.Router();



let index = (req,res)=>{
    res.render('./index.html',{
        userid:req.query.userid || req.userid,
        msg:req.query.msg
    });
}

exports.index = index;