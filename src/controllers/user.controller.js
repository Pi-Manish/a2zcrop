const User = require('../models/User');

const createUser = async(req, res)=>{
    const newUser = new User({
        name:"admin",
        email:"admin@gmail.com",
        mobile:"9999999999",
        password:"admin@123"
    })
    const result = await newUser.save();
    res.code(201).send({
        status:true,
        message:"New User created successfully!",
        data:{
            user:result
        }
    })
}

const userAuthenticate = async(req, res)=>{
    const {email , password} = req.body;
    const user =  await User.findOne({email , password});
    if(user)
    {
        const userToken = await res.jwtSign({
            _id: user._id,
          },{
            expiresIn:'1d'
          });
        return res.code(200).send({
            status:true,
            message:"User found!",
            data:{
                userToken
            }
        })
    }
    else{
        return res.code(404).send({
            status:false,
            message:"User not found!",
            data:{
                
            }
        })
    }
}

const userAuthenticateOpts = {
    handler:userAuthenticate
}

module.exports = {
    createUser,
    userAuthenticate,
    userAuthenticateOpts
}