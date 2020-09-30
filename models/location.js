const mongoose = require ('mongoose');

const locationSchema =  new mongoose.Schema({
    country:{type:String,required:true},
    province: {type:String,required:true},
    city: {type:String,required:true}


},{collection:'location',timestamps:true})
locationSchema.index({ email: 1, sweepstakes_id: 1 }, { unique: true });

module.exports = mongoose.model('User',locationSchema);