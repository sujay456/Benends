const User=require('../../../models/user');
const jwt=require('jsonwebtoken');


module.exports.createSession= async function(req,res)
{
    try {

        let user=await User.findOne( { email:req.body.email});

        if(!user || user.password!=req.body.password)
        {
            return res.json(401,{
                message:"Unauthorised"
            });
        }

        return res.json(200,{
            message:"Sign in succesfull",
            data:{
                token:jwt.sign(user.toJSON(),'benends',{expiresIn:'1000000'})
            }
        })
        
    } catch (error) {
        return res.json(500,{
            message:'Internal server Error'
        })
    }

}