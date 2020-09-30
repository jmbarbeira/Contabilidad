const express = require('express');
const app = express();
const bcrypt = require('bcrypt');
const auth = require('../middleware/auth');
const User = require('../models/user');

app.post('/',(req,res)=>{
    let user = new User({
        email: req.body.email,
        password: bcrypt.hashSync(req.body.password,10),
        name:req.body.name,
        surname: req.body.surname
    })

    user.save((err,user)=>{
        if(err){
            return res.status(400).json({message:err})
        }
        res.status(200).json({
            message:'User was created'
        })
    })
})

app.post('/login',auth.login,(req,res)=>{
    res.status(200).json({
        message:'OK'
    })
})

module.exports = app;