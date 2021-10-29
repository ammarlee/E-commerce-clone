const mongoose = require("mongoose");
const Schema = mongoose.Schema
const CategorySchema = new Schema({
    name:{type:String ,unique:true},
    img:{type:String},
    subCategory:[
        { 
            name:{type:String ,unique:true},
             img:{type:String},
            
        }
    ],
    color:String,
    description:String,
   
})
module.exports = mongoose.model('Category', CategorySchema);
