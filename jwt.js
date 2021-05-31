const crypto = require('crypto');
require('dotenv').config();

function createToken(userid){
    let header = {
        "alg":"HS256",
        "typ":"JWT"
    }
    let encodeheader = Buffer.from(JSON.stringify(header)).toString('base64').replace('==','').replace('=','');

    let exp = new Date().getTime() +60*60*2*1000;

    let payload = {exp,userid,}

    let encodepayload = Buffer.from(JSON.stringify(payload)).toString('base64').replace('==','').replace('=','');

    let signature = crypto.createHmac('sha256',Buffer.from(process.env.salt))
                            .update(`${encodeheader}.${encodepayload}`)
                            .digest('base64')
                            .replace('==','')
                            .replace('=','');
    
    let jwt =`${encodeheader}.${encodepayload}.${signature}`;
    return jwt;
    
}

module.exports = createToken;