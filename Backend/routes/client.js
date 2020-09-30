const express = require ('express');

const app = express();

const Client = require('../models/client');

app.post('/',(req,res)=>{
    let client = new Client({
        name:req.body.name,
        cif:req.body.cif,
        location:{
            country:req.body.country,
            province: req.body.province,
            city: req.body.city
        },
        address:req.body.address
    })
    client.save((err,client)=>{
        if (err){
            return res.status(400).json({error:err});
        }
        res.status(200).json({
            mesage:'client was created correctly',
            client:client
        });
    })
})

app.get('/',(req,res)=>{
    Client.find({}).sort({name:1}).exec((err,clients)=>{
    if(err){
        return res.status(400).json({message:err})
    }
    res.status(200).json({
        clients:clients
    })
    
})
})

app.get('/search/:param',(req,res)=>{
    Client.find({displayName:{$regex:req.params.param}},(err,clients)=>{
        if (err){
            return res.status(400).json({mesage:err})
        }
        res.status(200).json({clients:clients

        })
    })

})


app.get('/:_id',(req,res)=>{
    Client.findOne({_id: req.params._id},(err,client)=>{
        if(err){
            return res.status(400).json({message:err})
        }
        res.status(200).json({
            client:client
        })
    })
    })

app.put('/:_id',(req,res)=>{

    let update={};
    if(req.body.name!==undefined){
        update.name=req.body.name;}
    if(req.body.cif!==undefined){
        update.description=req.body.cif;}
    if(req.body.location!==undefined){
        update.location=req.body.location;
    }
    if(req.body.address!==undefined){
        update.address=req.body.address;
    }
    console.log(update)
    Client.findByIdAndUpdate(req.params._id,{$set:update},(err,result)=>{
        if(err){
            return res.status(400).json({message:err})
        }
        res.status(200).json({message:`client ${result.name} has been updated`})
    })
    

})

app.delete('/:_id',(req,res)=>{
    Client.findByIdAndDelete(req.params._id,(err,result)=>{
    if(err){
        return res.status(400).json({message:err})
    }
    res.status(200).json({message:`client ${result.name} has been deleted`})
})
})

module.exports = app;