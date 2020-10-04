const mongoose =require('mongoose');

const invoiceSchema = new mongoose.Schema({
    invoiceNumber:{type:String,lowercase:true},
    client:{ 
        name:{type:String,required:true},
        cif:{type:String,unique:true,required:true},
        location:{
            country:{type:String,required:true},
            province: {type:String,required:true},
            city: {type:String,required:true},
            address: String,
            postal: String
        },
    },
    billingDate: Date,
    paymentDate: Date,
  
     items:[{
             description:{type:String,unique:true},
             units: {type:String,enum: ['Hours']},
             quantity:Number,
             unitPrice:Number,
             tax:Number,
             total:Number
     }],
     total:Number
     
})

module.exports = mongoose.model('Invoice',invoiceSchema);