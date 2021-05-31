const express= require('express');
const app = express();
const nunjucks = require('nunjucks');
const { sequelize } = require('./models');
require('dotenv').config();
const port = process.env.port || 3000;
const router = require('./routes');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');

app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());

app.set('view engine','html');
nunjucks.configure('views',{
    express:app
});
app.use(cookieParser());
app.use(express.static('public'));

// sequelize.sync({force:false})
// .then(()=>{
//     console.log('sequelize success');
// })
// .catch((err)=>{
//     console.log(err);
// })

app.use('/',router);

app.listen(port,()=>{
    console.log(`sever ${port} start`);
})
