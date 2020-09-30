const User = require('../models/user');
const bcrypt = require('bcrypt');

exports.login = (req,res,next) =>{

    console.log(req.body.email)


    User.findOne({email: req.body.email},(err,user)=>{
        if(err){
            return res.status(500).json({message:err})
        }
        if (!user){
            console.log(user)
            return res.status(400).json({message:'Email does not exist'})}
        if (!bcrypt.compareSync(req.body.password,user.password)){
            return res.status(400).json({message:'Please check your user or password'})}
            next(); 
        })

    
        
    
}