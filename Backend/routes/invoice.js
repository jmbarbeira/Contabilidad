const express = require ('express');
const app = express();
const Invoice = require('../models/invoice');

app.post('/',(req,res)=>{
    let invoice = new Invoice({
        client:{
        name:req.body.name,
        cif:req.body.cif,
        location:req.body.location,
        address:req.body.address},
        billinDate: req.body.billingDate,
        paymentDate: req.body.paymentDate,
        items:req.body.items,
        total: function (){
            let total=0
            req.body.items.forEach(element => {
            total+=element.unitPrice*element.quantity; 
            })
        }

    })

    invoice.save((err,invoice)=>{
        if (err){
            return res.status(400).json({error:err});
        }
        res.status(200).json({
            mesage:'invoice was created correctly',
            invoice:invoice
        });
    })
})

app.get('/',(req,res)=>{
    Invoice.find({}).sort({name:1}).exec((err,invoices)=>{
    if(err){
        return res.status(400).json({message:err})
    }
    res.status(200).json({
        invoices:invoices
    })
    
})
})

app.get('/search/:param',(req,res)=>{
    Invoice.find({"client.name":{$regex:req.params.param}},(err,invoices)=>{
        if (err){
            return res.status(400).json({mesage:err})
        }
        res.status(200).json({invoices:invoices

        })
    })

})


app.get('/:_id',(req,res)=>{
    Invoice.findOne({_id: req.params._id},(err,invoice)=>{
        if(err){
            return res.status(400).json({message:err})
        }
        res.status(200).json({
            invoice:invoice
        })
    })
    })

app.put('/:_id',(req,res)=>{

    let update={};
    if(req.body.items!==undefined){
        update.items=req.body.items;
        update.total=function (){
            let total=0
            req.body.items.forEach(element => {
                total+=(element.unitPrice*element.quantity); 
                })
        }
    }
    if(req.body.billingDate!==undefined){
        update.billingDate=req.body.billingDate;}
    if(req.body.paymentDate!==undefined){
        update.location=req.body.paymentDate;
    }
    console.log(update)
    Invoice.findByIdAndUpdate(req.params._id,{$set:update},(err,result)=>{
        if(err){
            return res.status(400).json({message:err})
        }
        res.status(200).json({message:`invoice ${result.name} has been updated`})
    })
    
})

app.delete('/:_id',(req,res)=>{
    Invoice.findByIdAndDelete(req.params._id,(err,result)=>{
    if(err){
        return res.status(400).json({message:err})
    }
    res.status(200).json({message:`invoice ${result.name} has been deleted`})
})
})


module.exports = app;