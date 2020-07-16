const express=require('express');
const port=8000;
const cookieParser=require('cookie-parser');
const app=express();

const expressLayouts=require('express-ejs-layouts');
const db=require('./config/mongoose');

app.use(express.urlencoded());

app.use(cookieParser());
app.use(expressLayouts);
app.set('layout extractStyles',true);
app.set('layout extractScripts',true);


app.use(express.static('./assets'));
// use express router
app.set('view engine','ejs');
app.set('views','./views');

app.use('/',require('./routes/index'));


app.listen(port,(err)=>{
    if(err)
    {
        console.log("Error");
    }
    console.log(`Server is up and running: ${port} `);
});