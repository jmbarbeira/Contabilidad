const mongoose =require('mongoose');

let provinces=["Comunidad de Madrid","Ontario"]

const clientSchema = new mongoose.Schema({
    name:{type:String,required:true},
    cif:{type:String,unique:true,required:true},
    location:{
        country:{type:String,required:true},
        province: {type:String,required:true},
        city: {type:String,required:true}
    },
    address:String
   
},{collection:'client',timestamps:true})

module.exports = mongoose.model('Client',clientSchema);