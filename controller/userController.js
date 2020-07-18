const User=require('../models/user');
const { findOne } = require('../models/user');

module.exports.profile=(req,res)=>{
    if(req.isAuthenticated())
    {
        return res.render('profile');
    }
    return res.redirect('/user/signin');
}

module.exports.signup=(req,res)=>{
    if(req.isAuthenticated())
    {
        return res.redirect('/user/profile');
    }
    return res.render('signup');
}


module.exports.signin=(req,res)=>{
    if(req.isAuthenticated())
    {
        return res.redirect('/user/profile');
    }
    return res.render('signin');
}

module.exports.create=(req,res)=>{

    // console.log(req.body);

    User.findOne({email:req.body.email },(err,user)=>{
        if(err)
        {
            console.error.bind(console,"Errror");
            return;
        }
        if(!user)
        {
            User.create(req.body,(err,newUser)=>{
                if(err)
                {
                    console.error(err);
                    return;
                }
                // console.log(newUser);
                return res.render('signin');
            })
        }
        else{
            res.redirect('back');
        }
    })
}

module.exports.createSession=(req,res)=>{

    // console.log(req.user);
    return res.redirect('/');

}

module.exports.signout=(req,res)=>
{
    req.logout();
    res.clearCookie('benends');
    res.redirect('/user/signin');
}