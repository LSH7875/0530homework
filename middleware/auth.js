const crypto = require('crypto');
const express=require('express');
const app = express();
require('dotenv').config();
const bodyParser = require('body-parser');
app.use(bodyParser.json());
express.json();

module.exports = (req,res,next) =>{
    console.log('1');
    console.log(req.cookies);
    let {AccessToken} = req.cookies;

    console.log('2');
    if(AccessToken){
        let [header,payload,sign]= AccessToken.split('.');
        let signature = getSignature(header,payload);
        console.log(payload);
        if(signature == sign){
            console.log('parse');
            console.log(JSON.parse(JSON.stringify(payload.toString())));
            console.log('parse2');
            console.log(JSON.parse(Buffer.from(payload,'base64').toString()) );
            //let {userid,exp} = JSON.parse(JSON.stringify(payload.toString()));
            let {userid,exp} = JSON.parse(Buffer.from(payload,'base64').toString()) 
            console.log(userid);
            let nextexp = new Date().getTime();
            if(nextexp > exp){
                res.clearCookie('AccessToken');
                res.redirect('/?msg=토큰완료');
            }

            res.userid = userid;
            console.log('auth-userid');
            console.log(userid);
            console.log('auth-res.userid')
            console.log(res.userid);
            next();
        }
    }else{
        next();
    }
}

function getSignature(header,payload){
    const signature = crypto.createHmac('sha256',Buffer.from(process.env.salt))
                            .update(header+"."+payload)
                            .digest('base64')
                            .replace('==','')
                            .replace('=','');
    return signature;
}